import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/auth/require-session';
import { refreshUserSession } from '@/lib/auth/refresh-session';
import {
  updateVehicleSchema,
  VEHICLE_TYPE_ENUM_TO_LABEL,
  zodFieldErrors,
} from '@/lib/validations/vehicle';
import { jsonError, jsonOk } from '@/lib/api-response';

type RouteContext = { params: Promise<{ id: string }> };

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

async function getOwnedVehicle(id: string, ownerId: string) {
  return prisma.vehicle.findFirst({ where: { id, ownerId } });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const auth = await requireSession();
  if ('error' in auth) return auth.error;

  if (auth.session.role !== 'carrier') {
    return jsonError('Bu işlem yalnızca taşıyıcılar içindir', 403);
  }

  const { id } = await context.params;
  const vehicle = await getOwnedVehicle(id, auth.session.userId);
  if (!vehicle) return jsonError('Araç bulunamadı', 404);

  try {
    const body = await request.json();
    const parsed = updateVehicleSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError('Lütfen formu kontrol edin', 400, zodFieldErrors(parsed.error));
    }

    const data = parsed.data;

    if (data.plate && data.plate !== vehicle.plate) {
      const dup = await prisma.vehicle.findUnique({
        where: {
          ownerId_plate: { ownerId: auth.session.userId, plate: data.plate },
        },
      });
      if (dup) {
        return jsonError('Bu plaka filonuzda zaten kayıtlı', 409, {
          plate: ['Bu plakaya sahip bir araç zaten var'],
        });
      }
    }

    const updated = await prisma.vehicle.update({
      where: { id },
      data: {
        ...(data.plate !== undefined && { plate: data.plate }),
        ...(data.brand !== undefined && { brand: data.brand }),
        ...(data.model !== undefined && { model: data.model ?? null }),
        ...(data.year !== undefined && { year: data.year ?? null }),
        ...(data.type !== undefined && { type: data.type }),
        ...(data.capacity !== undefined && { capacity: data.capacity }),
        ...(data.capacityUnit !== undefined && { capacityUnit: data.capacityUnit }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });

    await refreshUserSession(auth.session.userId);
    return jsonOk(serializeVehicle(updated));
  } catch (error) {
    console.error('[vehicles PATCH]', error);
    return jsonError('Araç güncellenemedi', 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireSession();
  if ('error' in auth) return auth.error;

  if (auth.session.role !== 'carrier') {
    return jsonError('Bu işlem yalnızca taşıyıcılar içindir', 403);
  }

  const { id } = await context.params;
  const vehicle = await getOwnedVehicle(id, auth.session.userId);
  if (!vehicle) return jsonError('Araç bulunamadı', 404);

  await prisma.vehicle.delete({ where: { id } });
  await refreshUserSession(auth.session.userId);

  return jsonOk({ message: 'Araç silindi' });
}
