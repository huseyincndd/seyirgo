import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/auth/require-session';
import {
  createCargoListingSchema,
  zodCargoFieldErrors,
} from '@/lib/validations/cargo-listing';
import { serializeCargoListing } from '@/lib/cargo-listings/serialize';
import { jsonError, jsonOk } from '@/lib/api-response';

export async function GET() {
  const auth = await requireSession();
  if ('error' in auth) return auth.error;

  if (auth.session.role !== 'shipper') {
    return jsonError('Bu işlem yalnızca yük verenler içindir', 403);
  }

  const listings = await prisma.cargoListing.findMany({
    where: { ownerId: auth.session.userId },
    orderBy: { createdAt: 'desc' },
  });

  return jsonOk(listings.map(serializeCargoListing));
}

export async function POST(request: NextRequest) {
  const auth = await requireSession();
  if ('error' in auth) return auth.error;

  if (auth.session.role !== 'shipper') {
    return jsonError('Bu işlem yalnızca yük verenler içindir', 403);
  }

  try {
    const body = await request.json();
    const parsed = createCargoListingSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError('Lütfen formu kontrol edin', 400, zodCargoFieldErrors(parsed.error));
    }

    const data = parsed.data;

    const listing = await prisma.cargoListing.create({
      data: {
        ownerId: auth.session.userId,
        categoryId: data.categoryId,
        originCountry: data.originCountry.trim(),
        originCity: data.originCity.trim(),
        originDistrict: data.originDistrict.trim(),
        destinationCountry: data.destinationCountry.trim(),
        destinationCity: data.destinationCity.trim(),
        destinationDistrict: data.destinationDistrict.trim(),
        cargoDetails: data.cargoDetails as any,
        status: 'ACTIVE',
      },
    });

    return jsonOk(listing, 201);
  } catch (error) {
    console.error('[cargo listings POST]', error);
    return jsonError('İlan oluşturulamadı', 500);
  }
}
