"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, Sparkles, X, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface DocumentDropzoneProps {
  file: File | null;
  setFile: (file: File | null) => void;
  onAnalyze: (file: File) => void;
  onLoadSample: () => void;
  loading: boolean;
  language: Language;
}

export const DocumentDropzone: React.FC<DocumentDropzoneProps> = ({
  file,
  setFile,
  onAnalyze,
  onLoadSample,
  loading,
  language,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const t = translations[language].upload;

  const processingSteps = [
    'Reading document structure...',
    'Extracting key clauses & terms...',
    'Identifying rights & obligations...',
    'Detecting potential legal risks...',
    'Building actionable next steps...',
  ];

  // Simulates progress steps during loading
  React.useEffect(() => {
    if (!loading) {
      setProcessingStep(0);
      return;
    }
    const interval = setInterval(() => {
      setProcessingStep((prev) => (prev < processingSteps.length - 1 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(interval);
  }, [loading]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type === 'application/pdf' ||
        droppedFile.name.endsWith('.pdf') ||
        droppedFile.name.endsWith('.docx')
      ) {
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`saas-card p-8 sm:p-12 border-2 border-dashed transition-all flex flex-col items-center justify-center text-center ${
            dragOver
              ? 'border-[#2563EB] bg-[#EFF6FF] scale-[1.005]'
              : 'border-[#E5E7EB] hover:border-[#CBD5E1] bg-white'
          }`}
        >
          {/* Upload Icon Box */}
          <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] text-[#0F172A] flex items-center justify-center mb-5 border border-[#E5E7EB] shadow-xs">
            <Upload className="w-6 h-6 text-[#2563EB]" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-1">
            {t.dragTitle}
          </h3>
          <p className="text-xs sm:text-sm text-[#667085] max-w-md mb-6 font-normal">
            {t.dragSubtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <label className="w-full sm:w-auto cursor-pointer text-center bg-[#0F172A] hover:bg-[#1E293B] text-white px-6 py-3 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95">
              <FileText className="w-4 h-4 text-blue-400" /> {t.browse}
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleInputChange}
              />
            </label>

            <button
              type="button"
              onClick={onLoadSample}
              disabled={loading}
              className="w-full sm:w-auto bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#111827] px-5 py-3 rounded-xl font-semibold text-xs transition-all border border-[#E5E7EB] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> {t.trySample}
            </button>
          </div>

          {/* Feature Badges */}
          <div className="mt-8 pt-6 border-t border-[#E5E7EB] w-full flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#667085] font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> Source-Grounded QA
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> Clause Risk Radar
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> Action Steps & Evidence Checklist
            </span>
          </div>
        </motion.div>
      ) : (
        /* Active Upload & Processing State */
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          className="saas-card p-6 border border-[#E5E7EB] bg-white space-y-4"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111827] text-base">{file.name}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#667085] border border-[#E5E7EB]">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <p className="text-xs text-[#667085] mt-0.5 font-medium">
                  {loading ? processingSteps[processingStep] : t.ready}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {!loading && (
                <button
                  onClick={() => onAnalyze(file)}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  {t.reAnalyze} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={() => setFile(null)}
                className="p-2.5 text-[#667085] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-[#E5E7EB]"
                title={t.remove}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Processing Steps Animation */}
          {loading && (
            <div className="pt-3 border-t border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-[#0F172A]">
                <span>Analyzing your document</span>
                <span>{Math.round(((processingStep + 1) / processingSteps.length) * 100)}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
                <motion.div
                  className="bg-[#2563EB] h-full rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((processingStep + 1) / processingSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Steps Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium pt-1">
                {processingSteps.map((stepText, idx) => {
                  const isDone = idx < processingStep;
                  const isCurrent = idx === processingStep;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 className="w-3.5 h-3.5 text-[#2563EB] animate-spin flex-shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-[#CBD5E1] flex-shrink-0" />
                      )}
                      <span className={isDone ? 'text-[#111827] font-semibold' : isCurrent ? 'text-[#2563EB] font-bold' : 'text-[#94A3B8]'}>
                        {stepText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
