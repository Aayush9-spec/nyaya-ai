"use client";

import React from 'react';
import { CheckCircle2, UserCheck, Shield } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface ObligationsListProps {
  language: Language;
}

export const ObligationsList: React.FC<ObligationsListProps> = ({ language }) => {
  const yourObligations = [
    'Pay ₹25,000 monthly rent on or before 5th of each month',
    'Maintain premises in good, clean condition',
    'Provide 60 days required advance written notice for termination',
    'Follow structural alteration & sub-letting restrictions',
  ];

  const landlordObligations = [
    'Return security deposit subject to agreed terms upon expiry',
    'Give 24-hour advance notice prior to property inspection',
    'Handle and bear cost of major structural repairs exceeding ₹2,000',
    'Ensure quiet enjoyment and peaceful possession during term',
  ];

  return (
    <div className="saas-card p-6 space-y-4">
      <div className="pb-3 border-b border-[#E5E7EB]">
        <h3 className="font-bold text-[#111827] text-sm uppercase tracking-wider">
          CONTRACTUAL OBLIGATIONS SUMMARY
        </h3>
        <p className="text-xs text-[#667085] mt-0.5">Scannable breakdown of rights & responsibilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
        {/* Your Obligations */}
        <div className="p-5 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] space-y-3">
          <div className="flex items-center gap-2 text-[#0F172A] font-bold text-xs uppercase tracking-wider border-b border-[#E5E7EB] pb-2">
            <UserCheck className="w-4 h-4 text-[#2563EB]" />
            <span>YOUR OBLIGATIONS</span>
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

        {/* Other Party Obligations */}
        <div className="p-5 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] space-y-3">
          <div className="flex items-center gap-2 text-[#0F172A] font-bold text-xs uppercase tracking-wider border-b border-[#E5E7EB] pb-2">
            <Shield className="w-4 h-4 text-[#2563EB]" />
            <span>OTHER PARTY OBLIGATIONS</span>
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
