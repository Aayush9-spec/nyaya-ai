"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquareText, FileText, ArrowRight } from 'lucide-react';
import { Language, translations } from '../lib/translations';
import { FileUploadCard } from './FileUploadCard';

interface HeroProps {
  file: File | null;
  setFile: (file: File | null) => void;
  onAnalyze: (file: File) => void;
  onLoadSample: () => void;
  onOpenIssueModal: () => void;
  loading: boolean;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({
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
    <section className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Small Label Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-extrabold tracking-wider uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{t.badge}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
        >
          {t.title}{' '}
          <span className="text-blue-600 block sm:inline">{t.titleAccent}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed"
        >
          {t.description}
        </motion.p>

        {/* Primary & Secondary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          <button
            onClick={() => {
              const uploader = document.getElementById('uploader-section');
              uploader?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <FileText className="w-4 h-4 text-blue-400" /> {t.primaryCta}
          </button>

          <button
            onClick={onOpenIssueModal}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <MessageSquareText className="w-4 h-4 text-slate-500" /> {t.secondaryCta}
          </button>
        </motion.div>

        {/* File Dropzone Card Container */}
        <div id="uploader-section" className="pt-8">
          <FileUploadCard
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
