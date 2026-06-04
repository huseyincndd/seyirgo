import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/auth/require-session';
import { refreshUserSession } from '@/lib/auth/refresh-session';
import {
  createVehicleSchema,
  VEHICLE_TYPE_ENUM_TO_LABEL,
  zodFieldErrors,
} from '@/lib/validations/vehicle';
import { jsonError, jsonOk } from '@/lib/api-response';

function serializeVehicle(v: {
  id: string;
  plate: string;
  brand: string | null;
  model: string | null;
  year: string | null;
  type: keyof typeof VEHICLE_TYPE_ENUM_TO_LABEL;
  capacity: number;
  capacityUnit: string;
  status: string;
  createdAt: Date;
}) {
  return {
    id: v.id,
    plate: v.plate,
    brand: v.brand,
    model: v.model,
    year: v.year,
    type: VEHICLE_TYPE_ENUM_TO_LABEL[v.type as keyof typeof VEHICLE_TYPE_ENUM_TO_LABEL] ?? v.type,
    typeEnum: v.type,
    capacity: v.capacity,
    capacityUnit: v.capacityUnit,
    capacityLabel: `${v.capacity} ${v.capacityUnit === 'ton' ? 'ton' : 'kg'}`,
    status: v.status.toLowerCase(),
    createdAt: v.createdAt.toISOString(),
  };
}

export async function GET() {
  const auth = await requireSession();
  if ('error' in auth) return auth.error;

  if (auth.session.role !== 'carrier') {
    return jsonError('Bu işlem yalnızca taşıyıcılar içindir', 403);
  }

  const vehicles = await prisma.vehicle.findMany({
    where: { ownerId: auth.session.userId },
    orderBy: { createdAt: 'desc' },
  });

  return jsonOk(vehicles.map(serializeVehicle));
}

export async function POST(request: NextRequest) {
  const auth = await requireSession();
  if ('error' in auth) return auth.error;

  if (auth.session.role !== 'carrier') {
    return jsonError('Bu işlem yalnızca taşıyıcılar içindir', 403);
  }

  try {
    const body = await request.json();
    const parsed = createVehicleSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(
        'Lütfen formu kontrol edin',
        400,
        zodFieldErrors(parsed.error)
      );
    }

    const data = parsed.data;

    const existing = await prisma.vehicle.findUnique({
      where: {
        ownerId_plate: {
          ownerId: auth.session.userId,
          plate: data.plate,
        },
      },
    });

    if (existing) {
      return jsonError('Bu plaka filonuzda zaten kayıtlı', 409, {
        plate: ['Bu plakaya sahip bir araç zaten var'],
      });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        plate: data.plate,
        brand: data.brand,
        model: data.model ?? null,
        year: data.year ?? null,
        type: data.type,
        capacity: data.capacity,
        capacityUnit: data.capacityUnit,
        ownerId: auth.session.userId,
      },
    });

    await refreshUserSession(auth.session.userId);

    return jsonOk(serializeVehicle(vehicle), 201);
  } catch (error) {
    console.error('[vehicles POST]', error);
    return jsonError('Araç eklenirken bir hata oluştu', 500);
  }
}
