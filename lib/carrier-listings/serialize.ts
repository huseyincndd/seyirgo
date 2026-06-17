import type { CarrierListing, Vehicle } from '@prisma/client';
import { VEHICLE_TYPE_ENUM_TO_LABEL } from '@/lib/validations/vehicle';

type ListingWithVehicle = CarrierListing & {
  vehicle: Pick<
    Vehicle,
    'id' | 'plate' | 'brand' | 'model' | 'type' | 'capacity' | 'capacityUnit'
  >;
};

export function formatListingRoute(listing: {
  originCountry: string;
  originCity: string;
  originDistrict: string;
  destinationType: string;
  destinationCountry: string | null;
  destinationCity: string | null;
  destinationDistrict: string | null;
  destinationRegion: string | null;
  destinationExcludedRegions: string[];
}): { from: string; to: string; toShort: string; fullFrom: string; fullTo: string; exclusions: string[] } {
  const isTr = listing.originCountry === 'Türkiye';
  const fromShort = `${listing.originCity} / ${listing.originDistrict}`;
  const fullFrom = isTr ? fromShort : `${listing.originCountry} - ${fromShort}`;

  let toShort = '—';
  let fullTo = '—';
  const exclusions = listing.destinationExcludedRegions || [];

  switch (listing.destinationType) {
    case 'TURKEY_WIDE':
      toShort = 'Tüm Türkiye';
      fullTo = 'Tüm Türkiye geneli';
      break;
    case 'REGION':
      toShort = listing.destinationRegion || 'Bölge';
      fullTo = `${toShort} Bölgesi`;
      break;
    case 'SPECIFIC_CITY':
    case 'SPECIFIC_LOCATION':
      toShort = listing.destinationDistrict 
        ? `${listing.destinationCity} / ${listing.destinationDistrict}`
        : (listing.destinationCity || 'Şehir');
      fullTo = toShort;
      break;
    case 'INTERNATIONAL':
      toShort = listing.destinationCountry || 'Yurtdışı';
      fullTo = listing.destinationCity ? `${toShort} - ${listing.destinationCity}` : toShort;
      break;
  }

  return { 
    from: fromShort, 
    to: fullTo, 
    toShort,
    fullFrom,
    fullTo,
    exclusions
  };
}

export function serializeCarrierListing(listing: ListingWithVehicle) {
  const route = formatListingRoute(listing);
  const typeLabel =
    VEHICLE_TYPE_ENUM_TO_LABEL[
      listing.vehicle.type as keyof typeof VEHICLE_TYPE_ENUM_TO_LABEL
    ] ?? listing.vehicle.type;

  return {
    id: listing.id,
    vehicleId: listing.vehicleId,
    
    // Origin
    originCountry: listing.originCountry,
    originCity: listing.originCity,
    originDistrict: listing.originDistrict,
    
    // Destination
    destinationType: listing.destinationType,
    destinationCountry: listing.destinationCountry,
    destinationCity: listing.destinationCity,
    destinationDistrict: listing.destinationDistrict,
    destinationRegion: listing.destinationRegion,
    destinationExcludedRegions: listing.destinationExcludedRegions,
    
    route,
    note: listing.note,
    availableFrom: listing.availableFrom?.toISOString() ?? null,
    status: listing.status.toLowerCase(),
    createdAt: listing.createdAt.toISOString(),
    vehicle: {
      id: listing.vehicle.id,
      plate: listing.vehicle.plate,
      brand: listing.vehicle.brand,
      model: listing.vehicle.model,
      type: typeLabel,
      capacityLabel: `${listing.vehicle.capacity} ${listing.vehicle.capacityUnit === 'ton' ? 'ton' : 'kg'}`,
    },
  };
}

export type SerializedCarrierListing = ReturnType<typeof serializeCarrierListing>;
