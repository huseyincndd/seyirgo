import type { ApiResponse } from '@/app/types';

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  return res.json();
}
