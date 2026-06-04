import type { CarrierListing, Vehicle } from '@prisma/client';
import { VEHICLE_TYPE_ENUM_TO_LABEL } from '@/lib/validations/vehicle';

type ListingWithVehicle = CarrierListing & {
  vehicle: Pick<
    Vehicle,
    'id' | 'plate' | 'brand' | 'model' | 'type' | 'capacity' | 'capacityUnit'
  >;
};

export function formatListingRoute(listing: {
  originCity: string;
  destinationType: string;
  destinationCity: string | null;
}): { from: string; to: string; toShort: string } {
  const from = listing.originCity;
  if (listing.destinationType === 'TURKEY_WIDE') {
    return {
      from,
      to: 'Türkiye geneli',
      toShort: 'Her yere uygun',
    };
  }
  const to = listing.destinationCity ?? '—';
  return { from, to, toShort: to };
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
    originCity: listing.originCity,
    destinationType: listing.destinationType,
    destinationCity: listing.destinationCity,
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
