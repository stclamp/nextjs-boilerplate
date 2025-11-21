'use client';

import {useEffect} from 'react';
import {useTranslations} from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  const t = useTranslations('Error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-24">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">{t('generic')}</h2>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
