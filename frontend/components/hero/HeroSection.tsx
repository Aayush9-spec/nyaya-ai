"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquareText, FileText, CheckCircle2 } from 'lucide-react';
import { Language, translations } from '../../lib/translations';
import { DocumentDropzone } from '../upload/DocumentDropzone';

interface HeroSectionProps {
  file: File | null;
  setFile: (file: File | null) => void;
  onAnalyze: (file: File) => void;
  onLoadSample: () => void;
  onOpenIssueModal: () => void;
  loading: boolean;
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  file,
  setFile,
  onAnalyze,
  onLoadSample,
  onOpenIssueModal,
  loading,
  language,
}) => {
  const t = translations[language].hero;

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] text-[#0F172A] border border-[#E5E7EB] text-[11px] font-extrabold tracking-wider uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>{t.badge}</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight leading-tight"
        >
          {t.title}{' '}
          <span className="text-[#2563EB] block sm:inline">{t.titleAccent}</span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#667085] text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed"
        >
          {t.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1"
        >
          <button
            onClick={() => {
              const uploader = document.getElementById('dropzone-target');
              uploader?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <FileText className="w-4 h-4 text-blue-400" /> {t.primaryCta} →
          </button>

          <button
            onClick={onOpenIssueModal}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F8FAFC] text-[#111827] font-bold text-xs rounded-xl border border-[#E5E7EB] shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <MessageSquareText className="w-4 h-4 text-[#667085]" /> {t.secondaryCta}
          </button>
        </motion.div>

        {/* Below Buttons Guarantees */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-semibold text-[#667085]"
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Source-grounded
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Plain language
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Privacy-focused
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Actionable
          </span>
        </motion.div>

        {/* Document Dropzone Container */}
        <div id="dropzone-target" className="pt-6">
          <DocumentDropzone
            file={file}
            setFile={setFile}
            onAnalyze={onAnalyze}
            onLoadSample={onLoadSample}
            loading={loading}
            language={language}
          />
        </div>
      </div>
    </section>
  );
};
