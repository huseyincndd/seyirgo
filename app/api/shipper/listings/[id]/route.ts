import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/auth/require-session';
import { jsonError, jsonOk } from '@/lib/api-response';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireSession();
  if ('error' in auth) return auth.error;

  const { id } = await params;

  try {
    const listing = await prisma.cargoListing.findUnique({
      where: { id },
      select: { ownerId: true },
    });

    if (!listing) return jsonError('İlan bulunamadı', 404);
    if (listing.ownerId !== auth.session.userId) {
      return jsonError('Bu ilanı silme yetkiniz yok', 403);
    }

    await prisma.cargoListing.delete({ where: { id } });
    return jsonOk({ success: true });
  } catch (error) {
    console.error('[cargo listing DELETE]', error);
    return jsonError('İlan silinirken bir hata oluştu', 500);
  }
}
