'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, PasswordInput } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)', flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const MetaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  terms?: string;
}

export default function LoginPage() {
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

  const features = [
    'Effortlessly spider and map targets to uncover hidden security flaws',
    'Deliver high-quality, validated findings in hours, not weeks.',
    'Generate professional, enterprise-grade security reports automatically.',
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] gradient-login-bg flex-col justify-between px-16 py-12 relative overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-2.5 z-10">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L2 4v4c0 2.8 2.1 5.4 5 6 2.9-.6 5-3.2 5-6V4L7 1z" fill="white" />
            </svg>
          </div>
          <span className="text-base font-bold text-white tracking-tight">aps</span>
        </div>

        {/* Main content */}
        <div className="z-10 flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-2">
              Expert level Cybersecurity{' '}
              <br />
              in{' '}
              <span style={{ color: 'var(--accent)' }}>hours</span>{' '}
              not weeks.
            </h1>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
              What&apos;s included
            </p>
            <ul className="flex flex-col gap-3" role="list">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0">
                    <CheckIcon />
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust badge */}
        <div className="z-10">
          <div className="flex items-center gap-2 mb-1">
            <StarIcon />
            <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Trustpilot
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">Rated 4.5/5.0</span>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>(100k+ reviews)</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div
        className="flex-1 flex items-center justify-center px-8 py-12 lg:px-16"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(10,30,25,0.9) 0%, #0A0A0A 60%)',
        }}
      >
        {/* Mobile logo */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L2 4v4c0 2.8 2.1 5.4 5 6 2.9-.6 5-3.2 5-6V4L7 1z" fill="white" />
            </svg>
          </div>
          <span className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>aps</span>
        </div>

        <div className="w-full max-w-[420px]">
          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
            }}
          >
            <div className="text-center mb-7">
              <h2
                className="text-2xl font-bold mb-1.5"
                style={{ color: '#111111' }}
              >
                Sign up
              </h2>
              <p className="text-sm" style={{ color: '#555555' }}>
                Already have an account?{' '}
                <button
                  type="button"
                  className="font-semibold transition-colors hover:opacity-80 cursor-pointer"
                  style={{ color: 'var(--accent)' }}
                  onClick={() => router.push('/dashboard')}
                >
                  Log in
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
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

              {/* Terms checkbox */}
              <div className="flex flex-col gap-1">
                <label className="flex items-start gap-3 cursor-pointer" htmlFor="terms">
                  <div
                    className="relative w-4 h-4 rounded flex-shrink-0 mt-0.5 flex items-center justify-center transition-all cursor-pointer"
                    style={{
                      backgroundColor: terms ? 'var(--accent)' : '#F3F4F6',
                      border: `1.5px solid ${terms ? 'var(--accent)' : '#D1D5DB'}`,
                    }}
                    onClick={() => setTerms((v) => !v)}
                  >
                    {terms && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <input
                    id="terms"
                    type="checkbox"
                    className="sr-only"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    aria-required="true"
                  />
                  <span className="text-sm leading-relaxed" style={{ color: '#555555' }}>
                    I agree to Aps&apos;s{' '}
                    <button
                      type="button"
                      className="font-medium underline cursor-pointer"
                      style={{ color: 'var(--accent)' }}
                    >
                      Terms & Conditions
                    </button>
                    {' '}and acknowledge the{' '}
                    <button
                      type="button"
                      className="font-medium underline cursor-pointer"
                      style={{ color: 'var(--accent)' }}
                    >
                      Privacy Policy
                    </button>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-xs pl-7" style={{ color: '#EF4444' }}>
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full mt-1"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px" style={{ backgroundColor: '#E5E7EB' }} />
              <span className="text-xs" style={{ color: '#9CA3AF' }}>or continue with</span>
              <div className="flex-1 h-px" style={{ backgroundColor: '#E5E7EB' }} />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-3 gap-3">
              {/* Apple */}
              <button
                type="button"
                className="h-11 flex items-center justify-center rounded-[var(--radius-sm)] transition-all hover:opacity-80 active:scale-[0.97] cursor-pointer"
                style={{ backgroundColor: '#000', color: 'white' }}
                aria-label="Continue with Apple"
              >
                <AppleIcon />
              </button>

              {/* Google */}
              <button
                type="button"
                className="h-11 flex items-center justify-center rounded-[var(--radius-sm)] transition-all cursor-pointer"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                }}
                aria-label="Continue with Google"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
              >
                <GoogleIcon />
              </button>

              {/* Meta */}
              <button
                type="button"
                className="h-11 flex items-center justify-center rounded-[var(--radius-sm)] transition-all hover:opacity-90 active:scale-[0.97] cursor-pointer"
                style={{ backgroundColor: '#1877F2', color: 'white' }}
                aria-label="Continue with Meta"
              >
                <MetaIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
