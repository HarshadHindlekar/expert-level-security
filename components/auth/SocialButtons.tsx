import React from 'react';
import { type SocialButtonsProps } from '@/types/components';
import { AppleIcon, GoogleIcon, MetaIcon } from '@/components/icons/AuthIcons';

export function SocialButtons({ metaButtonClassName }: SocialButtonsProps) {
  return (
    <>
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-[#E5E7EB]" />
        <span className="text-xs text-[#9CA3AF]">or continue with</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          className="h-11 flex items-center justify-center rounded-full transition-all hover:opacity-80 active:scale-[0.97] cursor-pointer bg-black text-white"
          aria-label="Continue with Apple"
        >
          <AppleIcon />
        </button>

        <button
          type="button"
          className="h-11 flex items-center justify-center rounded-full transition-all cursor-pointer bg-[#f1e6e6ff] border border-[#E5E7EB] hover:bg-[#F9FAFB] active:scale-[0.97]"
          aria-label="Continue with Google"
        >
          <GoogleIcon />
        </button>

        <button
          type="button"
          className={
            metaButtonClassName ??
            'h-11 flex items-center justify-center rounded-full transition-all hover:opacity-90 active:scale-[0.97] cursor-pointer bg-[#1877F2] text-white'
          }
          aria-label="Continue with Meta"
        >
          <MetaIcon />
        </button>
      </div>
    </>
  );
}
