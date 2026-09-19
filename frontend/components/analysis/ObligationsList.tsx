"use client";

import React from 'react';
import { CheckCircle2, UserCheck, Shield } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface ObligationsListProps {
  language: Language;
  obligations?: string[];
  rights?: string[];
}

export const ObligationsList: React.FC<ObligationsListProps> = ({
  language,
  obligations,
  rights,
}) => {
  const yourObligations =
    obligations && obligations.length > 0
      ? obligations
      : [
          'Pay agreed rent and maintenance charges on or before the due date each month.',
          'Maintain premises in good, clean condition and report damages.',
          'Provide mandatory advance written notice prior to vacating premises.',
        ];

  const landlordObligations =
    rights && rights.length > 0
      ? rights
      : [
          'Right to quiet enjoyment and peaceful possession throughout active tenancy.',
          'Full refund of security deposit subject to agreed itemized deductions.',
          'Advance written notice prior to any rate adjustment or property inspection.',
        ];

  return (
    <div className="saas-card p-6 space-y-4">
      <div className="pb-3 border-b border-[#E5E7EB]">
        <h3 className="font-bold text-[#111827] text-sm uppercase tracking-wider">
          CONTRACTUAL OBLIGATIONS & RIGHTS SUMMARY
        </h3>
        <p className="text-xs text-[#667085] mt-0.5">Scannable breakdown of rights & responsibilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
        {/* Your Obligations */}
        <div className="p-5 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] space-y-3">
          <div className="flex items-center gap-2 text-[#0F172A] font-bold text-xs uppercase tracking-wider border-b border-[#E5E7EB] pb-2">
            <UserCheck className="w-4 h-4 text-[#2563EB]" />
            <span>YOUR OBLIGATIONS ({yourObligations.length})</span>
          </div>

          <ul className="space-y-2.5">
            {yourObligations.map((ob, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs font-medium text-[#111827]">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{ob}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Party Obligations / Rights */}
        <div className="p-5 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] space-y-3">
          <div className="flex items-center gap-2 text-[#0F172A] font-bold text-xs uppercase tracking-wider border-b border-[#E5E7EB] pb-2">
            <Shield className="w-4 h-4 text-[#2563EB]" />
            <span>COUNTERPARTY OBLIGATIONS & YOUR RIGHTS ({landlordObligations.length})</span>
          </div>

          <ul className="space-y-2.5">
            {landlordObligations.map((ob, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs font-medium text-[#111827]">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{ob}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
