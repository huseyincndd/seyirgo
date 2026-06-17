import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jsonOk, jsonError } from '@/lib/api-response';
import { requireSession } from '@/lib/auth/require-session';
import { REGION_CITIES } from '@/app/data/locations';
import { serializeCargoListing } from '@/lib/cargo-listings/serialize';

export async function GET(request: NextRequest) {
  try {
    const auth = await requireSession();
    if ('error' in auth) return auth.error;

    if (auth.session.role !== 'carrier') {
      return jsonError('Unauthorized', 401);
    }

    // 1. Taşıyıcının aktif ilanlarını çek (rotalar ve araç bilgileri dahil)
    const carrierListings = await prisma.carrierListing.findMany({
      where: {
        ownerId: auth.session.userId,
        status: 'ACTIVE'
      },
      include: {
        vehicle: true
      }
    });

    if (carrierListings.length === 0) {
      return jsonOk([]); // Eğer aktif rota ilanı yoksa eşleşecek yük de yok.
    }

    // 2. Yük listesini (CargoListings) veritabanından çek. 
    // Tüm aktif yükleri çekip filtrelemeyi bellek üzerinde (in-memory) yapacağız. 
    // Çünkü "bölge" vs gibi karmaşık iş kuralları veritabanı sorgusunda zor olabilir.
    const allCargos = await prisma.cargoListing.findMany({
      where: {
        status: 'ACTIVE'
      },
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
            companyTitle: true,
            phone: true,
            email: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const matchedCargosMap = new Map<string, any>();

    // 3. Eşleştirme Motoru
    for (const cargo of allCargos) {
      for (const cl of carrierListings) {
        // A) Kategori / Araç Eşleşmesi
        // Şimdilik Kategori uyumu arıyoruz (örneğin 1A karayolu vs)
        // İleride vehicleType ve kategori daha akıllı eşleşebilir. 
        // Ancak bu aşamada lokasyon eşleşmesi önceliğimiz.

        // B) Çıkış (Origin) Eşleşmesi
        // Taşıyıcının kalkış ili ile yükün bulunduğu il aynı olmalı.
        if (cl.originCity !== cargo.originCity) {
          continue; // Eşleşmedi, sonraki rotaya bak.
        }

        // C) Varış (Destination) Eşleşmesi
        let destinationMatch = false;

        if (cl.destinationType === 'TURKEY_WIDE' && cargo.destinationCountry === 'Türkiye') {
          destinationMatch = true;
        } else if (cl.destinationType === 'INTERNATIONAL' && cargo.destinationCountry !== 'Türkiye') {
          destinationMatch = true;
        } else if (cl.destinationType === 'SPECIFIC_CITY' || cl.destinationType === 'SPECIFIC_LOCATION') {
          if (cl.destinationCity === cargo.destinationCity) {
            destinationMatch = true;
          }
        } else if (cl.destinationType === 'REGION') {
          if (cl.destinationRegion && REGION_CITIES[cl.destinationRegion]) {
            if (REGION_CITIES[cl.destinationRegion].includes(cargo.destinationCity)) {
              destinationMatch = true;
            }
          }
        }

        // Eğer excluded region varsa ve kargo o region içindeyse eşleşmeyi boz
        if (destinationMatch && cl.destinationExcludedRegions && cl.destinationExcludedRegions.length > 0) {
          for (const excRegion of cl.destinationExcludedRegions) {
            if (REGION_CITIES[excRegion] && REGION_CITIES[excRegion].includes(cargo.destinationCity)) {
              destinationMatch = false;
              break;
            }
          }
        }

        if (destinationMatch) {
          // Bu kargo bu rota ile eşleşti!
          if (!matchedCargosMap.has(cargo.id)) {
            // Eşleşme oranını sembolik olarak belirliyoruz (şehirden şehire %100, bölge %85 vs)
            let matchScore = 90;
            if (cl.destinationType === 'SPECIFIC_CITY') matchScore = 100;
            if (cl.destinationType === 'TURKEY_WIDE') matchScore = 70;

            matchedCargosMap.set(cargo.id, {
              ...cargo,
              matchedVehicle: cl.vehicle.plate,
              matchScore,
              shipper: cargo.owner
            });
            
            // Increment the matchCount conceptually (or we can just leave the DB field untouched and rely on viewCount)
            // Wait, to keep performance high, we update matchCount periodically.
          }
          break; // Bir kargo, taşıyıcının herhangi bir rotasıyla eşleşmesi listeye girmesi için yeterlidir.
        }
      }
    }

    const matchedList = Array.from(matchedCargosMap.values());

    // 4. Return serialized version + extra shipper info
    const responseData = matchedList.map(item => {
      const serialized = serializeCargoListing(item);
      return {
        ...serialized,
        matchedVehicle: item.matchedVehicle,
        matchScore: item.matchScore,
        shipper: item.shipper
      };
    });

    return jsonOk(responseData);
  } catch (error: any) {
    console.error('Matchmaking API Error:', error);
    return jsonError(error.message, 500);
  }
}
