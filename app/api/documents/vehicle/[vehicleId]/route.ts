import { NextRequest } from 'next/server';
import { VehicleDocumentType } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { jsonError, jsonOk } from '@/lib/api-response';
import { VEHICLE_DOCUMENTS, getRequiredVehicleDocumentTypes } from '@/lib/documents';

const DEMO_NAMES: Partial<Record<VehicleDocumentType, string>> = {
  VEHICLE_REGISTRATION: 'ruhsat-demo.pdf',
  TRAFFIC_INSURANCE: 'trafik-sigortasi-demo.pdf',
  CARGO_INSURANCE: 'kasko-demo.pdf',
};

async function assertVehicleOwner(vehicleId: string, userId: string) {
  const vehicle = await prisma.vehicle.findFirst({
    where: { id: vehicleId, ownerId: userId },
  });
  if (!vehicle) return null;
  return vehicle;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ vehicleId: string }> }
) {
  const session = await getSession();
  if (!session) return jsonError('Oturum gerekli', 401);

  const { vehicleId } = await params;
  const vehicle = await assertVehicleOwner(vehicleId, session.userId);
  if (!vehicle) return jsonError('Araç bulunamadı', 404);

  const records = await prisma.vehicleDocument.findMany({ where: { vehicleId } });
  const byType = new Map(records.map((r) => [r.type, r]));

  const items = VEHICLE_DOCUMENTS.map((def) => {
    const record = byType.get(def.type as VehicleDocumentType);
    const required = getRequiredVehicleDocumentTypes().includes(
      def.type as VehicleDocumentType
    );
    return {
      type: def.type,
      title: def.title,
      description: def.description,
      hint: def.hint,
      required,
      status: record?.status ?? 'MISSING',
      demoFileName: record?.demoFileName ?? null,
      id: record?.id ?? null,
    };
  });

  return jsonOk({ vehicleId, plate: vehicle.plate, items });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ vehicleId: string }> }
) {
  const session = await getSession();
  if (!session) return jsonError('Oturum gerekli', 401);

  const { vehicleId } = await params;
  const vehicle = await assertVehicleOwner(vehicleId, session.userId);
  if (!vehicle) return jsonError('Araç bulunamadı', 404);

  const body = await request.json();
  const type = body?.type as VehicleDocumentType;
  if (!type || !Object.values(VehicleDocumentType).includes(type)) {
    return jsonError('Geçersiz belge türü', 400);
  }

  const now = new Date();
  const doc = await prisma.vehicleDocument.upsert({
    where: { vehicleId_type: { vehicleId, type } },
    create: {
      vehicleId,
      type,
      status: 'PENDING',
      demoFileName: DEMO_NAMES[type] ?? 'arac-belgesi-demo.pdf',
      submittedAt: now,
    },
    update: {
      status: 'PENDING',
      demoFileName: DEMO_NAMES[type] ?? 'arac-belgesi-demo.pdf',
      submittedAt: now,
      rejectReason: null,
    },
  });

  return jsonOk({
    id: doc.id,
    type: doc.type,
    status: doc.status,
    demoFileName: doc.demoFileName,
  });
}
