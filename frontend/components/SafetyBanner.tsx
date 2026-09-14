"use client";

import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface SafetyBannerProps {
  language: Language;
}

export const SafetyBanner: React.FC<SafetyBannerProps> = ({ language }) => {
  const t = translations[language].safety;

  return (
    <div className="w-full bg-slate-100/70 border-b border-slate-200/80 py-2.5 px-4 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>{t.disclaimer}</span>
      </div>
    </div>
  );
};
