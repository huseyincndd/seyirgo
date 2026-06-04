import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/auth/require-session';
import {
  createCarrierListingSchema,
  zodListingFieldErrors,
} from '@/lib/validations/carrier-listing';
import { serializeCarrierListing } from '@/lib/carrier-listings/serialize';
import { jsonError, jsonOk } from '@/lib/api-response';

export async function GET() {
  const auth = await requireSession();
  if ('error' in auth) return auth.error;

  if (auth.session.role !== 'carrier') {
    return jsonError('Bu işlem yalnızca taşıyıcılar içindir', 403);
  }

  const listings = await prisma.carrierListing.findMany({
    where: { ownerId: auth.session.userId },
    include: {
      vehicle: {
        select: {
          id: true,
          plate: true,
          brand: true,
          model: true,
          type: true,
          capacity: true,
          capacityUnit: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return jsonOk(listings.map(serializeCarrierListing));
}

export async function POST(request: NextRequest) {
  const auth = await requireSession();
  if ('error' in auth) return auth.error;

  if (auth.session.role !== 'carrier') {
    return jsonError('Bu işlem yalnızca taşıyıcılar içindir', 403);
  }

  try {
    const body = await request.json();
    const parsed = createCarrierListingSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError('Lütfen formu kontrol edin', 400, zodListingFieldErrors(parsed.error));
    }

    const data = parsed.data;

    const vehicle = await prisma.vehicle.findFirst({
      where: { id: data.vehicleId, ownerId: auth.session.userId },
    });

    if (!vehicle) {
      return jsonError('Seçilen araç bulunamadı', 404);
    }

    const availableFrom = data.availableFrom
      ? new Date(data.availableFrom)
      : null;

    const listing = await prisma.carrierListing.create({
      data: {
        ownerId: auth.session.userId,
        vehicleId: data.vehicleId,
        originCity: data.originCity.trim(),
        destinationType: data.destinationType,
        destinationCity:
          data.destinationType === 'SPECIFIC_CITY'
            ? data.destinationCity?.trim() ?? null
            : null,
        note: data.note?.trim() || null,
        availableFrom,
        status: 'ACTIVE',
      },
      include: {
        vehicle: {
          select: {
            id: true,
            plate: true,
            brand: true,
            model: true,
            type: true,
            capacity: true,
            capacityUnit: true,
          },
        },
      },
    });

    return jsonOk(serializeCarrierListing(listing), 201);
  } catch (error) {
    console.error('[carrier listings POST]', error);
    return jsonError('İlan oluşturulamadı', 500);
  }
}
