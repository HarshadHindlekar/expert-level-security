'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, PasswordInput } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SocialButtons } from '@/components/auth/SocialButtons';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  terms?: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    if (!password || password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!terms) newErrors.terms = 'You must agree to the terms';
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
            <h2 className="text-2xl font-bold mb-1.5 text-[#111111]">Sign up</h2>
            <p className="text-sm text-[#555555]">
              Already have an account?{' '}
              <button
                type="button"
                className="font-semibold transition-colors hover:opacity-80 cursor-pointer text-[var(--accent)]"
                onClick={() => router.push('/login')}
              >
                Log in
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div className="grid grid-cols-1 gap-5">
              <Input
                variant="light"
                placeholder="First name*"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={errors.firstName}
                aria-required="true"
                autoComplete="given-name"
              />
              <Input
                variant="light"
                placeholder="Last name*"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={errors.lastName}
                aria-required="true"
                autoComplete="family-name"
              />
            </div>

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
              autoComplete="new-password"
            />

            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <span className="relative w-4 h-4 flex-shrink-0 mt-0.5">
                  <span
                    className={
                      terms
                        ? 'absolute inset-0 rounded flex items-center justify-center transition-all bg-[var(--accent)] border-[1.5px] border-[var(--accent)]'
                        : 'absolute inset-0 rounded flex items-center justify-center transition-all bg-[#F3F4F6] border-[1.5px] border-[#D1D5DB]'
                    }
                    aria-hidden="true"
                  >
                    {terms && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <input
                    id="terms"
                    type="checkbox"
                    className="absolute inset-0 w-4 h-4 opacity-0 cursor-pointer"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    aria-required="true"
                  />
                </span>
                <span className="text-sm leading-relaxed text-[#555555]">
                  I agree to Aps&apos;s{' '}
                  <button type="button" className="font-medium underline cursor-pointer text-[var(--accent)]">
                    Terms & Conditions
                  </button>{' '}
                  and acknowledge the{' '}
                  <button type="button" className="font-medium underline cursor-pointer text-[var(--accent)]">
                    Privacy Policy
                  </button>
                </span>
              </label>
              {errors.terms && <p className="text-xs pl-7 text-[#EF4444]">{errors.terms}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-1 rounded-full"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <SocialButtons />
        </div>
      </div>
    </AuthLayout>
  );
}
