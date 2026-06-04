import { NextResponse } from 'next/server';

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function jsonError(message: string, status = 400, errors?: Record<string, string[]>) {
  return NextResponse.json(
    { success: false, error: message, errors },
    { status }
  );
}
