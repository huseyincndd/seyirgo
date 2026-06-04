import { UserDocumentType } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { jsonError, jsonOk } from '@/lib/api-response';
import { refreshUserSession } from '@/lib/auth/refresh-session';
import { getRequiredUserDocuments, isUserDocumentSubmitted } from '@/lib/documents';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const session = await getSession();
  if (!session) return jsonError('Oturum gerekli', 401);

  const { type: typeParam } = await params;
  const type = typeParam as UserDocumentType;
  if (!Object.values(UserDocumentType).includes(type)) {
    return jsonError('Geçersiz belge türü', 400);
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) return jsonError('Kullanıcı bulunamadı', 404);

  const allowed = getRequiredUserDocuments(user.role).map((d) => d.type);
  if (!allowed.includes(type)) {
    return jsonError('Bu belge türü hesabınız için geçerli değil', 400);
  }

  const existing = await prisma.userDocument.findUnique({
    where: { userId_type: { userId: session.userId, type } },
  });

  if (!existing || !isUserDocumentSubmitted(existing.status)) {
    return jsonError('Önce demo gönder ile belgeyi iletin', 400);
  }

  const now = new Date();
  const doc = await prisma.userDocument.update({
    where: { id: existing.id },
    data: {
      status: 'APPROVED',
      reviewedAt: now,
      rejectReason: null,
    },
  });

  await refreshUserSession(session.userId);

  return jsonOk({
    type: doc.type,
    status: doc.status,
    reviewedAt: doc.reviewedAt?.toISOString(),
  });
}
