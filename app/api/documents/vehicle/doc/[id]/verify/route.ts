import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { jsonError, jsonOk } from '@/lib/api-response';
import { isUserDocumentSubmitted } from '@/lib/documents';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return jsonError('Oturum gerekli', 401);

  const { id } = await params;
  const doc = await prisma.vehicleDocument.findUnique({
    where: { id },
    include: { vehicle: true },
  });

  if (!doc || doc.vehicle.ownerId !== session.userId) {
    return jsonError('Belge bulunamadı', 404);
  }

  if (!isUserDocumentSubmitted(doc.status)) {
    return jsonError('Önce demo gönder ile belgeyi iletin', 400);
  }

  const now = new Date();
  const updated = await prisma.vehicleDocument.update({
    where: { id },
    data: { status: 'APPROVED', reviewedAt: now, rejectReason: null },
  });

  return jsonOk({
    id: updated.id,
    type: updated.type,
    status: updated.status,
    reviewedAt: updated.reviewedAt?.toISOString(),
  });
}
