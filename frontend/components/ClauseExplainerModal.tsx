"use client";

import React from 'react';
import { X, BookOpen, AlertTriangle, ShieldCheck, HelpCircle, MessageSquare } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface ClauseExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  clauseData: {
    title: string;
    originalText: string;
    simpleExplanation: string;
    whyItMatters: string;
    potentialRisk: string;
    severity: 'High' | 'Medium' | 'Low' | string;
    pageNumber: number;
  } | null;
  onAskAiAboutClause: (clauseTitle: string) => void;
  language: Language;
}

export const ClauseExplainerModal: React.FC<ClauseExplainerModalProps> = ({
  isOpen,
  onClose,
  clauseData,
  onAskAiAboutClause,
  language,
}) => {
  const t = translations[language].clauseExplainer;

  if (!isOpen || !clauseData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">{clauseData.title}</h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {t.sourcePage} {clauseData.pageNumber}
                </span>
              </div>
              <p className="text-xs text-slate-500">{t.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 font-normal">
          {/* Original Clause Text */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800">
            <span className="font-bold font-sans text-xs text-slate-500 uppercase tracking-wider block mb-1.5">
              {t.original}
            </span>
            "{clauseData.originalText}"
          </div>

          {/* Simple Explanation */}
          <div className="space-y-1.5">
            <span className="font-bold text-slate-900 text-xs block">{t.simple}</span>
            <p className="text-slate-600 leading-relaxed text-xs p-3 bg-blue-50/60 rounded-xl border border-blue-100">
              {clauseData.simpleExplanation}
            </p>
          </div>

          {/* Grid: Why it Matters & Potential Risk */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.whyMatters}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-xs">{clauseData.whyItMatters}</p>
            </div>

            <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-100 space-y-1.5">
              <div className="flex items-center gap-1.5 text-rose-900 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{t.potentialRisk}</span>
              </div>
              <p className="text-rose-800 leading-relaxed text-xs">{clauseData.potentialRisk}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors"
          >
            {t.close}
          </button>

          <button
            onClick={() => {
              onAskAiAboutClause(clauseData.title);
              onClose();
            }}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" /> {t.askAiAbout}
          </button>
        </div>
      </div>
    </div>
  );
};
