// src/services/locale.ts
'use server';

import { cookies } from 'next/headers';

export async function setUserLocale(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set('NEXT_LOCALE', locale);
}
