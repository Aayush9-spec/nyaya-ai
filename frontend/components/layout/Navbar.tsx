"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, Globe, User, Menu, X, Settings, FileText, GitCompare, BookOpen, LayoutDashboard } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface NavbarProps {
  currentTab: 'dashboard' | 'analyze' | 'compare' | 'documents' | 'how-it-works';
  setCurrentTab: (tab: 'dashboard' | 'analyze' | 'compare' | 'documents' | 'how-it-works') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenHowItWorks: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenHowItWorks,
  onOpenSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language].nav;

  const navItems = [
    { key: 'analyze' as const, label: t.analyze },
    { key: 'compare' as const, label: t.compare },
    { key: 'documents' as const, label: t.documents },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* LEFT: Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
              <Scale className="w-4.5 h-4.5 text-blue-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black tracking-tight text-[#111827]">
                {t.brand}
              </span>
            </div>
          </button>

          {/* CENTER: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-[#F1F5F9] text-[#0F172A] font-bold'
                  : 'text-[#667085] hover:text-[#111827] hover:bg-[#F8FAFC]'
              }`}
            >
              {t.dashboard}
            </button>

            {navItems.map((item) => {
              const active = currentTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setCurrentTab(item.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#F1F5F9] text-[#0F172A] font-bold'
                      : 'text-[#667085] hover:text-[#111827] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <button
              onClick={onOpenHowItWorks}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#667085] hover:text-[#111827] hover:bg-[#F8FAFC] transition-all"
            >
              {t.howItWorks}
            </button>
          </nav>
        </div>

        {/* RIGHT: Language, Account Avatar, Settings */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-[#F1F5F9] p-1 rounded-lg border border-[#E5E7EB] text-xs">
            <Globe className="w-3.5 h-3.5 ml-1.5 mr-1 text-[#667085]" />
            <button
              onClick={() => setLanguage('English')}
              className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                language === 'English'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#667085] hover:text-[#111827]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('Hindi')}
              className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                language === 'Hindi'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#667085] hover:text-[#111827]'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Developer / Quality Metrics Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-[#667085] hover:text-[#111827] hover:bg-[#F1F5F9] rounded-lg transition-colors"
            title="Settings & Developer Metrics"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Account Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#E5E7EB]">
            <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              <User className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111827] hover:bg-[#F1F5F9] rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E5E7EB] bg-white p-4 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                setCurrentTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3.5 py-2 rounded-lg text-xs font-semibold ${
                currentTab === 'dashboard' ? 'bg-[#F1F5F9] text-[#111827] font-bold' : 'text-[#667085]'
              }`}
            >
              {t.dashboard}
            </button>

            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentTab(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3.5 py-2 rounded-lg text-xs font-semibold ${
                  currentTab === item.key ? 'bg-[#F1F5F9] text-[#111827] font-bold' : 'text-[#667085]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                onOpenHowItWorks();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3.5 py-2 rounded-lg text-xs font-semibold text-[#667085]"
            >
              {t.howItWorks}
            </button>
          </div>

          <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
            <div className="flex items-center bg-[#F1F5F9] p-1 rounded-lg text-xs">
              <button
                onClick={() => setLanguage('English')}
                className={`px-2.5 py-1 rounded-md font-bold ${
                  language === 'English' ? 'bg-white text-[#111827]' : 'text-[#667085]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('Hindi')}
                className={`px-2.5 py-1 rounded-md font-bold ${
                  language === 'Hindi' ? 'bg-white text-[#111827]' : 'text-[#667085]'
                }`}
              >
                हिन्दी
              </button>
            </div>

            <button
              onClick={() => {
                onOpenSettings();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-[#667085] flex items-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" /> Settings
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
