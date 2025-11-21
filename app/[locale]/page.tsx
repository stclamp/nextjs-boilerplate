import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const t = useTranslations('Home');
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-24">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          {t('title')}
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          {t('description')}
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login">
            <Button size="lg">{t('getStarted')}</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
