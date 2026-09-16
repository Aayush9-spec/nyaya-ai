"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, ClipboardList, MessageSquare, Check, ShieldCheck, Clock, UserCheck } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface ActionStep {
  action: string;
  priority: string;
  deadline: string;
}

interface ActionPlanData {
  action_plan: ActionStep[];
  evidence_checklist: string[];
  lawyer_questions: string[];
}

interface ActionPlanViewProps {
  data: ActionPlanData;
  language: Language;
}

export const ActionPlanView: React.FC<ActionPlanViewProps> = ({ data, language }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const t = translations[language].actionPlan;

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const totalChecklist = data.evidence_checklist.length;
  const completedChecklist = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = totalChecklist > 0 ? Math.round((completedChecklist / totalChecklist) * 100) : 0;

  const standardTimelinePhases = [
    { name: '1. Review Important Clause', icon: Zap },
    { name: '2. Collect Evidence', icon: ClipboardList },
    { name: '3. Check Deadline', icon: Clock },
    { name: '4. Prepare Questions', icon: MessageSquare },
    { name: '5. Recommended Professional Review', icon: UserCheck },
  ];

  const [showLegalNotice, setShowLegalNotice] = useState(false);

  const generateNoticeText = () => {
    return `
LEGAL NOTICE / FORMAL DEMAND
Date: ${new Date().toLocaleDateString()}

TO: Counterparty / Landlord / Opposing Party
RE: Formal Demand and Notice of Contractual Compliance

DEAR SIR/MADAM,

I am writing this formal legal notice regarding our agreement and key obligations outlined below:

SUMMARY OF ISSUES:
${data.action_plan.map((a, i) => `${i + 1}. ${a.action} (Deadline: ${a.deadline})`).join('\n')}

EVIDENCE & DOCUMENTATION MAINTAINED:
${data.evidence_checklist.map((e) => `- ${e}`).join('\n')}

FORMAL DEMAND & LEGAL RECOURSE:
Please take notice that you are hereby requested to comply with the terms above within seven (7) days of receipt of this notice. Failure to address these matters will compel the undersigned to initiate appropriate legal proceedings before the competent court of jurisdiction for appropriate remedy, damages, and costs.

SINCERELY,
[Your Name / Authorized Representative]
`.trim();
  };

  return (
    <div className="saas-card p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{t.title}</h3>
          <p className="text-xs text-slate-500 font-normal">{t.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLegalNotice(true)}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
          >
            <ClipboardList className="w-3.5 h-3.5" /> Draft Legal Notice
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4" /> Ready to Execute
          </div>
        </div>
      </div>

      {/* Standard Timeline Phase Pills */}
      <div className="hidden lg:grid grid-cols-5 gap-2 p-1.5 bg-slate-100 rounded-xl text-[11px] font-bold text-slate-600">
        {standardTimelinePhases.map((phase, idx) => (
          <div key={idx} className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white shadow-sm text-center">
            <phase.icon className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span className="truncate">{phase.name}</span>
          </div>
        ))}
      </div>

      {/* Immediate Next Steps List */}
      <div className="space-y-3">
        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block">
          {t.timeline}
        </span>

        <div className="space-y-3">
          {data.action_plan.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs flex-shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-slate-900 text-xs">{step.action}</h5>
                <div className="flex items-center gap-3 mt-1 flex-wrap text-[11px]">
                  <span className="font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                    {step.priority} Priority
                  </span>
                  <span className="text-slate-400 font-medium">• Deadline: {step.deadline}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Evidence Checklist & Lawyer Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Interactive Evidence Checklist */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-900">{t.checklist}</h4>
            </div>
            <span className="text-xs font-bold text-blue-600">
              {completedChecklist}/{totalChecklist} {t.checklistProgress}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`Evidence checklist progress: ${progressPercent}%`}>
            <div
              className="bg-blue-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="space-y-2 pt-1">
            {data.evidence_checklist.map((item, i) => {
              const isDone = !!checkedItems[i];
              return (
                <div
                  key={i}
                  onClick={() => toggleCheck(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCheck(i); } }}
                  role="checkbox"
                  aria-checked={isDone}
                  aria-label={`Evidence item: ${item}`}
                  tabIndex={0}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer select-none ${
                    isDone
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors mt-0.5 flex-shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={`text-xs font-medium leading-relaxed ${isDone ? 'line-through opacity-70' : ''}`}>
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lawyer Questions */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <h4 className="text-xs font-bold text-slate-900">{t.lawyerQuestions}</h4>
          </div>

          <div className="space-y-2">
            {data.lawyer_questions.map((q, i) => (
              <div
                key={i}
                className="p-3 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-800 leading-relaxed"
              >
                • {q}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legal Notice Modal */}
      {showLegalNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h4 className="font-bold text-sm">Formal Legal Notice Draft</h4>
              <button
                onClick={() => setShowLegalNotice(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 bg-slate-50 overflow-y-auto flex-1 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
              {generateNoticeText()}
            </div>
            <div className="px-6 py-4 bg-white border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => {
                  const blob = new Blob([generateNoticeText()], { type: 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'Legal_Notice_Draft.md';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
              >
                Download Notice (.md)
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
