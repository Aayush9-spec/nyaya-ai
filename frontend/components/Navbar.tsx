"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, Globe, User, Menu, X, BarChart3, BookOpen, Layers } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface NavbarProps {
  currentTab: 'analyze' | 'compare' | 'dashboard' | 'documents' | 'how-it-works';
  setCurrentTab: (tab: 'analyze' | 'compare' | 'dashboard' | 'documents' | 'how-it-works') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenHowItWorks?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenHowItWorks,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language].nav;

  const navItems = [
    { key: 'dashboard' as const, label: t.dashboard },
    { key: 'analyze' as const, label: t.analyze },
    { key: 'compare' as const, label: t.compare },
    { key: 'documents' as const, label: t.documents },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
              <Scale className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-left">
              <span className="text-lg font-black tracking-tight text-slate-900 block leading-none">
                {t.brand}
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                {t.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = currentTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setCurrentTab(item.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-slate-100 text-slate-900 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <button
              onClick={onOpenHowItWorks}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
            >
              {t.howItWorks}
            </button>
          </nav>
        </div>

        {/* Right Tools: Language Toggle & User Profile */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quality Benchmark Link */}
          <Link
            href="/evaluation"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.qualityMetrics}</span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs">
            <Globe className="w-3.5 h-3.5 ml-2 text-slate-400" />
            <button
              onClick={() => setLanguage('English')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                language === 'English'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('Hindi')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                language === 'Hindi'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Account Profile Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-sm">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            <span className="text-xs font-bold text-slate-800 hidden lg:inline">
              {t.account}
            </span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white p-4 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentTab(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  currentTab === item.key ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenHowItWorks?.();
                setMobileMenuOpen(false);
              }}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600"
            >
              {t.howItWorks}
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              <button
                onClick={() => setLanguage('English')}
                className={`px-3 py-1 rounded-lg font-bold ${
                  language === 'English' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('Hindi')}
                className={`px-3 py-1 rounded-lg font-bold ${
                  language === 'Hindi' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                हिन्दी
              </button>
            </div>

            <Link
              href="/evaluation"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <BarChart3 className="w-3.5 h-3.5" /> Metrics
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
