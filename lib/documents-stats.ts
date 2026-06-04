import type { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  getRequiredUserDocumentTypes,
  isUserDocumentApproved,
  isUserDocumentSubmitted,
} from '@/lib/documents';

export interface DocumentStats {
  submitted: boolean;
  approved: boolean;
}

const EMPTY_STATS: DocumentStats = { submitted: false, approved: false };

export async function getUserDocumentStats(
  userId: string,
  role: UserRole
): Promise<DocumentStats> {
  const db = prisma as unknown as {
    userDocument?: {
      findMany: (args: { where: { userId: string } }) => Promise<
        { type: string; status: string }[]
      >;
    };
  };

  if (!db.userDocument?.findMany) {
    return EMPTY_STATS;
  }

  const required = getRequiredUserDocumentTypes(role);
  const docs = await db.userDocument.findMany({ where: { userId } });
  const statusByType = new Map(docs.map((d) => [d.type, d.status]));

  const submitted = required.every((type) =>
    isUserDocumentSubmitted(statusByType.get(type))
  );
  const approved = required.every((type) =>
    isUserDocumentApproved(statusByType.get(type))
  );

  return { submitted, approved };
}
