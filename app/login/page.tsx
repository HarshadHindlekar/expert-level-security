'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, PasswordInput } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SocialButtons } from '@/components/auth/SocialButtons';
import { type FormErrors } from '@/types/components';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    if (!password || password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    router.push('/dashboard');
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-[420px]">
        <div className="rounded-2xl p-8 bg-white border border-[#E2E8F0] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]">
            <div className="text-center mb-7">
              <h2
                className="text-2xl font-bold mb-1.5 text-[#111111]"
              >
                Log in
              </h2>
              <p className="text-sm text-[#555555]">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  className="font-semibold transition-colors hover:opacity-80 cursor-pointer text-[var(--accent)]"
                  onClick={() => router.push('/signup')}
                >
                  Sign up
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <Input
                variant="light"
                type="email"
                placeholder="Email address*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                aria-required="true"
                autoComplete="email"
              />

              <PasswordInput
                variant="light"
                placeholder="Password (8+ characters)*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                aria-required="true"
                autoComplete="current-password"
              />

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full mt-1 rounded-full"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </Button>
            </form>

            <SocialButtons />
          </div>
        </div>
    </AuthLayout>
  );
}
