import { NextRequest } from 'next/server';
import { UserDocumentType } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth/session';
import { jsonError, jsonOk } from '@/lib/api-response';
import { refreshUserSession } from '@/lib/auth/refresh-session';
import { getRequiredUserDocuments } from '@/lib/documents';
import { toAppRole } from '@/lib/onboarding';

const DEMO_NAMES: Partial<Record<UserDocumentType, string>> = {
  TAX_PLATE: 'vergi-levhasi-demo.pdf',
  TRADE_REGISTRY: 'ticaret-sicil-demo.pdf',
  SIGNATURE_CIRCULAR: 'imza-sirkuleri-demo.pdf',
  TRANSPORT_LICENSE: 'k-belgesi-demo.pdf',
  SRC_CERTIFICATE: 'src-demo.pdf',
  DRIVER_LICENSE: 'ehliyet-demo.pdf',
};

export async function GET() {
  const session = await getSession();
  if (!session) return jsonError('Oturum gerekli', 401);

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) return jsonError('Kullanıcı bulunamadı', 404);

  const definitions = getRequiredUserDocuments(user.role);
  const records = await prisma.userDocument.findMany({
    where: { userId: session.userId },
  });
  const byType = new Map(records.map((r) => [r.type, r]));

  const items = definitions.map((def) => {
    const record = byType.get(def.type as UserDocumentType);
    return {
      type: def.type,
      title: def.title,
      description: def.description,
      hint: def.hint,
      status: record?.status ?? 'MISSING',
      demoFileName: record?.demoFileName ?? null,
      submittedAt: record?.submittedAt?.toISOString() ?? null,
      reviewedAt: record?.reviewedAt?.toISOString() ?? null,
    };
  });

  return jsonOk({ items, role: toAppRole(user.role) });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return jsonError('Oturum gerekli', 401);

  const body = await request.json();
  const type = body?.type as UserDocumentType;
  if (!type || !Object.values(UserDocumentType).includes(type)) {
    return jsonError('Geçersiz belge türü', 400);
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) return jsonError('Kullanıcı bulunamadı', 404);

  const allowed = getRequiredUserDocuments(user.role).map((d) => d.type);
  if (!allowed.includes(type)) {
    return jsonError('Bu belge türü hesabınız için geçerli değil', 400);
  }

  const now = new Date();
  const doc = await prisma.userDocument.upsert({
    where: { userId_type: { userId: session.userId, type } },
    create: {
      userId: session.userId,
      type,
      status: 'PENDING',
      demoFileName: DEMO_NAMES[type] ?? 'belge-demo.pdf',
      submittedAt: now,
    },
    update: {
      status: 'PENDING',
      demoFileName: DEMO_NAMES[type] ?? 'belge-demo.pdf',
      submittedAt: now,
      rejectReason: null,
    },
  });

  await refreshUserSession(session.userId);

  return jsonOk({
    type: doc.type,
    status: doc.status,
    demoFileName: doc.demoFileName,
    submittedAt: doc.submittedAt?.toISOString(),
  });
}
