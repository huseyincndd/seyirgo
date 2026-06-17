import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jsonOk, jsonError } from '@/lib/api-response';
import { requireSession } from '@/lib/auth/require-session';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireSession();
    if ('error' in auth) return auth.error;

    if (auth.session.role !== 'carrier') {
      return jsonError('Unauthorized', 401);
    }

    const { id } = await params;

    // Yükün görüntülenme sayısını 1 artır.
    await prisma.cargoListing.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1
        }
      }
    });

    return jsonOk({ success: true });
  } catch (error: any) {
    console.error('View Tracking Error:', error);
    return jsonError(error.message, 500);
  }
}
