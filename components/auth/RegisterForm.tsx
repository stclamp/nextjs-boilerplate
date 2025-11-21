'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {Link} from '@/i18n/routing';
import axios from 'axios';
import {useTranslations} from 'next-intl';

const createRegisterSchema = (t: any) => z.object({
  email: z.string().email(t('invalidEmail')),
  password: z.string().min(6, t('passwordMin')),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: t('passwordMismatch'),
  path: ['confirmPassword'],
});

export default function RegisterForm() {
  const router = useRouter();
  const t = useTranslations('Auth.register');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const registerSchema = createRegisterSchema(t);
  type RegisterFormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the custom backend register endpoint directly
      // Or use a proxy API route if needed to hide backend URL
      // Here we assume direct call or via proxy
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
      
      await axios.post(`${API_URL}/user/signup/`, {
        email: data.email,
        password: data.password,
      });

      // Redirect to login on success
      router.push('/login?registered=true');
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || err.response.data.detail || err.response.data.error || 'Registration failed');
      } else {
        setError('An unexpected error occurred');
      }
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
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            {t('signIn')}
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
          <Input
            label={t('confirmPasswordLabel')}
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
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
