"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowDown, CheckCircle2, Clock, MessageSquareText, ShieldCheck, ArrowRight } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface ActionStep {
  action: string;
  priority: string;
  deadline: string;
}

interface ActionPlanTimelineProps {
  data: {
    action_plan: ActionStep[];
    evidence_checklist: string[];
    lawyer_questions: string[];
  } | null;
  onGenerateQuestions?: () => void;
  language: Language;
}

export const ActionPlanTimeline: React.FC<ActionPlanTimelineProps> = ({
  data,
  onGenerateQuestions,
  language,
}) => {
  const steps = data?.action_plan || [
    {
      action: 'Review Clause 6: Check the early termination conditions and forfeiture clauses.',
      priority: 'HIGH',
      deadline: 'Page 3 • Clause 6',
    },
    {
      action: 'Collect supporting documents: Gather original agreement, payment receipts, deposit proof & communications.',
      priority: 'MEDIUM',
      deadline: 'Within 7 days',
    },
    {
      action: 'Check important deadlines: Add 60-day renewal notice deadline (18 Jul 2027) to calendar.',
      priority: 'HIGH',
      deadline: 'Calendar entry',
    },
    {
      action: 'Prepare questions for a legal professional regarding statutory non-refundability enforceability.',
      priority: 'MEDIUM',
      deadline: 'Before notice',
    },
  ];

  return (
    <div className="saas-card p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
        <div>
          <h3 className="font-bold text-[#111827] text-base uppercase tracking-wider">
            YOUR ACTION PLAN
          </h3>
          <p className="text-xs text-[#667085] font-normal">
            Step-by-step chronological roadmap to protect your rights
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-[#ECFDF5] text-[#10B981] rounded-full border border-[#A7F3D0] flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" /> Ready to Execute
        </span>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isHigh = step.priority.toUpperCase() === 'HIGH';
          return (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-5 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#CBD5E1] transition-all space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white flex items-center justify-center font-black text-xs flex-shrink-0">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#111827] text-xs sm:text-sm leading-snug">
                        {step.action}
                      </h4>
                      <span className="text-[11px] text-[#667085] font-medium block mt-1">
                        Source / Ref: {step.deadline}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase flex-shrink-0 ${
                      isHigh
                        ? 'bg-[#FEF2F2] text-[#EF4444] border border-[#FCA5A5]'
                        : 'bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1]'
                    }`}
                  >
                    Priority: {step.priority}
                  </span>
                </div>

                {idx === 3 && onGenerateQuestions && (
                  <div className="pt-2 border-t border-[#E5E7EB] flex justify-end">
                    <button
                      onClick={onGenerateQuestions}
                      className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <MessageSquareText className="w-3.5 h-3.5 text-blue-400" /> Generate questions for lawyer →
                    </button>
                  </div>
                )}
              </motion.div>

              {idx < steps.length - 1 && (
                <div className="flex justify-center my-1 text-[#CBD5E1]">
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
