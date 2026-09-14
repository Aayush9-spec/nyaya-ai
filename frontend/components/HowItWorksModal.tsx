"use client";

import React from 'react';
import { X, Upload, ShieldCheck, Zap, BookOpen, Scale } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: Upload,
      title: '1. Upload PDF or Select Sample',
      description:
        'Upload your rental agreement, employment contract, or legal notice. Your file is securely parsed using PDF text extraction.',
    },
    {
      icon: BookOpen,
      title: '2. Statutory KB Grounding',
      description:
        'NyayaAI retrieves exact statutory laws (such as Model Tenancy Act, Contract Act) to cross-verify clauses against legal standards.',
    },
    {
      icon: ShieldCheck,
      title: '3. Risk Radar & Clause Explainer',
      description:
        'Clauses are scored 0-100 for risk. Click any clause to view plain-language explanations, why it matters, and potential liability.',
    },
    {
      icon: Zap,
      title: '4. Action Plan & Grounded Q&A',
      description:
        'Get a step-by-step action plan, evidence checklist, pre-drafted lawyer questions, and ask AI questions cited directly from page numbers.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <Scale className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">How NyayaAI Works</h3>
              <p className="text-xs text-slate-500">Source-grounded legal document intelligence</p>
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
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {steps.map((s, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="w-10 h-10 rounded-xl bg-white text-slate-900 flex items-center justify-center border border-slate-200 flex-shrink-0 shadow-sm">
                <s.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{s.title}</h4>
                <p className="text-xs text-slate-600 mt-1 font-normal leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-all shadow-sm"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
