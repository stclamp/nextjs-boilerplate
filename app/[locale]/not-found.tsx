'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const t = useTranslations('Error');
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-24">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-extrabold tracking-tight text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-bold text-gray-700">{t('notFound')}</h2>
        <Link href="/">
          <Button>{t('goHome')}</Button>
        </Link>
      </div>
    </div>
  );
}
