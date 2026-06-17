import type { CargoListing } from '@prisma/client';

export function formatCargoRoute(listing: CargoListing) {
  const isOrigTr = listing.originCountry === 'Türkiye';
  const fromShort = `${listing.originCity} / ${listing.originDistrict}`;
  const fullFrom = isOrigTr ? fromShort : `${listing.originCountry} - ${fromShort}`;

  const isDestTr = listing.destinationCountry === 'Türkiye';
  const toShort = `${listing.destinationCity} / ${listing.destinationDistrict}`;
  const fullTo = isDestTr ? toShort : `${listing.destinationCountry} - ${toShort}`;

  return { 
    from: fromShort, 
    to: toShort, 
    fullFrom,
    fullTo,
  };
}

export function serializeCargoListing(listing: CargoListing) {
  const route = formatCargoRoute(listing);
  
  // Basic parsing for details just in case it's stringified twice or typed loosely
  const details = (typeof listing.cargoDetails === 'object' && listing.cargoDetails !== null 
    ? listing.cargoDetails 
    : {}) as Record<string, any>;

  return {
    id: listing.id,
    categoryId: listing.categoryId,
    route,
    details,
    status: listing.status.toLowerCase(),
    viewCount: listing.viewCount,
    matchCount: listing.matchCount,
    createdAt: listing.createdAt.toISOString(),
  };
}

export type SerializedCargoListing = ReturnType<typeof serializeCargoListing>;
