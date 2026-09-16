"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, Sparkles, X, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface FileUploadCardProps {
  file: File | null;
  setFile: (file: File | null) => void;
  onAnalyze: (file: File) => void;
  onLoadSample: () => void;
  loading: boolean;
  language: Language;
}

export const FileUploadCard: React.FC<FileUploadCardProps> = ({
  file,
  setFile,
  onAnalyze,
  onLoadSample,
  loading,
  language,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const t = translations[language].upload;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.pdf')) {
        setFile(droppedFile);
        onAnalyze(droppedFile);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onAnalyze(selectedFile);
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`saas-card p-8 sm:p-12 border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center text-center ${
            dragOver
              ? 'border-blue-600 bg-blue-50/50 scale-[1.005]'
              : 'border-slate-300 hover:border-slate-400 bg-white'
          }`}
          role="region"
          aria-label="Upload PDF legal document for analysis"
        >
          {/* Upload Icon Container */}
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-5 border border-slate-200">
            <Upload className="w-7 h-7 text-slate-800" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5">
            {t.dragTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-6 font-normal">
            {t.dragSubtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <label className="w-full sm:w-auto cursor-pointer text-center bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95" role="button" tabIndex={0} aria-label="Browse and select a PDF document to upload">
              <FileText className="w-4 h-4 text-blue-400" /> {t.browse}
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleInputChange}
                aria-label="Select PDF document"
              />
            </label>

            <button
              type="button"
              onClick={onLoadSample}
              disabled={loading}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3.5 rounded-xl font-semibold text-xs transition-all border border-slate-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> {t.trySample}
            </button>
          </div>

          {/* Feature Badges */}
          <div className="mt-8 pt-6 border-t border-slate-100 w-full flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Source-Grounded QA
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Clause Risk Radar
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Action Steps & Evidence Checklist
            </span>
          </div>
        </motion.div>
      ) : (
        /* Active File Selected / Processing State */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="saas-card p-6 border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 flex-shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base">{file.name}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {loading ? t.analyzing : t.ready}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {loading ? (
              <div className="flex items-center gap-2.5 px-4 py-2.5 bg-blue-50 text-blue-700 font-semibold text-xs rounded-xl border border-blue-100">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>Processing PDF...</span>
              </div>
            ) : (
              <button
                onClick={() => onAnalyze(file)}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {t.reAnalyze} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => setFile(null)}
              className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-slate-200"
              title={t.remove}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
