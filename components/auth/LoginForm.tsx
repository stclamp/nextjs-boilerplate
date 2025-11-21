'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

const createLoginSchema = (t: any) => z.object({
  email: z.string().email(t('invalidEmail')),
  password: z.string().min(6, t('passwordMin')),
});

export default function LoginForm() {
  const router = useRouter();
  const t = useTranslations('Auth.login');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = createLoginSchema(t);
  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log('SignIn result:', result);

      if (result?.error && result.code) {
        setError(result.code);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError(t('unexpectedError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
        <p className="mt-2 text-sm text-gray-600">
          {t('or')}{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            {t('createAccount')}
          </Link>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Input
            label={t('emailLabel')}
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label={t('passwordLabel')}
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" isLoading={isLoading}>
          {t('submit')}
        </Button>
      </form>
    </div>
  );
}
