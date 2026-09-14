"use client";

import React, { useState } from 'react';
import { X, MessageSquareText, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface LegalIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: () => void;
  language: Language;
}

export const LegalIssueModal: React.FC<LegalIssueModalProps> = ({
  isOpen,
  onClose,
  onSelectSample,
  language,
}) => {
  const [issueText, setIssueText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const t = translations[language].issueModal;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <MessageSquareText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{t.title}</h3>
              <p className="text-xs text-slate-500">{t.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
                placeholder={t.placeholder}
                rows={4}
                className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-xs font-normal text-slate-800 placeholder:text-slate-400 bg-slate-50 focus:bg-white transition-all"
              />

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectSample();
                    onClose();
                  }}
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Analyze sample rental agreement instead
                </button>

                <button
                  type="submit"
                  disabled={!issueText.trim()}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-40"
                >
                  {t.submit} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Issue Logged & Ready for Analysis</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                  To give you exact clause citations and risk scores, please attach your agreement or notice below, or try our pre-loaded rental agreement sample.
                </p>
              </div>
              <button
                onClick={() => {
                  onSelectSample();
                  onClose();
                }}
                className="px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all shadow-sm"
              >
                Analyze Sample Contract
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
