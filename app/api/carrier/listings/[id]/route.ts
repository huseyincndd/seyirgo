import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/auth/require-session';
import { jsonError, jsonOk } from '@/lib/api-response';

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireSession();
  if ('error' in auth) return auth.error;

  if (auth.session.role !== 'carrier') {
    return jsonError('Bu işlem yalnızca taşıyıcılar içindir', 403);
  }

  const { id } = await context.params;

  const listing = await prisma.carrierListing.findFirst({
    where: { id, ownerId: auth.session.userId },
  });

  if (!listing) {
    return jsonError('İlan bulunamadı', 404);
  }

  await prisma.carrierListing.delete({ where: { id } });

  return jsonOk({ message: 'İlan silindi' });
}
