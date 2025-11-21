'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from 'next/navigation';
import {routing} from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
    const searchParams = window.location.search;
    router.push(`/${newLocale}${pathnameWithoutLocale}${searchParams}`);
  };

  const localeNames: Record<string, string> = {
    en: 'English',
    uk: 'Українська',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-md border text-black border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc] || loc.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
