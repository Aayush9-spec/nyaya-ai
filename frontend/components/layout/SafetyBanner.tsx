"use client";

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface SafetyBannerProps {
  language: Language;
}

export const SafetyBanner: React.FC<SafetyBannerProps> = ({ language }) => {
  const t = translations[language].safety;

  return (
    <div className="w-full bg-[#FFFFFF] border-t border-[#E5E7EB] py-4 px-4 text-center mt-16">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-medium text-[#667085]">
        <ShieldCheck className="w-4 h-4 text-[#10B981] flex-shrink-0" />
        <span>{t.disclaimer}</span>
      </div>
    </div>
  );
};
