import React from 'react';

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[var(--accent)] shrink-0"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const features = [
    'Effortlessly spider and map targets to uncover hidden security flaws',
    'Deliver high-quality, validated findings in hours, not weeks.',
    'Generate professional, enterprise-grade security reports automatically.',
  ];

  return (
    <div className="min-h-screen relative overflow-hidden gradient-login-bg">
      <div
        className="absolute inset-0 bg-[radial-gradient(900px_520px_at_30%_10%,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0)_70%)]"
        aria-hidden="true"
      />
      <div className="min-h-screen relative z-10 flex flex-col">
        <header className="w-full flex justify-center flex-shrink-0">
          <div className="w-full px-4 pt-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center bg-[var(--accent)]"
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L2 4v4c0 2.8 2.1 5.4 5 6 2.9-.6 5-3.2 5-6V4L7 1z" fill="white" />
                </svg>
              </div>
              <span className="text-base font-bold text-white tracking-tight">aps</span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 pb-10 lg:px-12 lg:pb-12 flex items-center justify-center">
          <div className="w-full max-w-[1180px] grid grid-cols-1 lg:grid-cols-[1fr_520px] items-stretch gap-16">
            <div className="hidden lg:flex flex-col justify-between h-full relative px-6 py-6">
              <div className="z-10 flex flex-col gap-8 mt-10">
                <div>
                  <h1 className="text-4xl font-bold text-white leading-tight mb-2">
                    Expert level Cybersecurity <br />in <span className="text-[var(--accent)]">hours</span> not weeks.
                  </h1>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-4 text-[rgba(255,255,255,0.6)]">What&apos;s included</p>
                  <ul className="flex flex-col gap-3" role="list">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0">
                          <CheckIcon />
                        </span>
                        <span className="text-sm leading-relaxed text-[rgba(255,255,255,0.75)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="z-10">
                <div className="flex items-center gap-2 mb-1">
                  <StarIcon />
                  <span className="text-sm font-medium text-[rgba(255,255,255,0.8)]">Trustpilot</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-white">Rated 4.5/5.0</span>
                  <span className="text-sm text-[rgba(255,255,255,0.5)]">(100k+ reviews)</span>
                </div>
              </div>
            </div>

            <div className="w-full h-full flex items-center justify-center">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
