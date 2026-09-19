"use client";

import React from 'react';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface ImportantDatesTimelineProps {
  language: Language;
  deadlines?: string[];
  dates?: Array<{ date: string; label: string; priority: string }>;
}

export const ImportantDatesTimeline: React.FC<ImportantDatesTimelineProps> = ({
  language,
  deadlines,
  dates: providedDates,
}) => {
  const dates = React.useMemo(() => {
    if (providedDates && providedDates.length > 0) return providedDates;
    if (deadlines && deadlines.length > 0) {
      return deadlines.map((d, idx) => {
        const isCritical =
          d.toLowerCase().includes('notice') ||
          d.toLowerCase().includes('penalty') ||
          d.toLowerCase().includes('expire') ||
          d.toLowerCase().includes('termination') ||
          d.toLowerCase().includes('due');

        const parts = d.split(':');
        const label = parts.length > 1 ? parts[0].trim() : d;
        const dateStr = parts.length > 1 ? parts[1].trim() : `Deadline ${idx + 1}`;

        return {
          date: dateStr,
          label: label,
          priority: isCritical ? 'Critical' : 'Standard',
        };
      });
    }

    return [
      { date: 'Notice Period', label: 'Mandatory advance written notice required', priority: 'Critical' },
      { date: 'Payment Due', label: 'Rent and maintenance payment due window', priority: 'Standard' },
    ];
  }, [deadlines, providedDates]);

  return (
    <div className="saas-card p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4.5 h-4.5 text-[#2563EB]" />
          <h3 className="font-bold text-[#111827] text-sm uppercase tracking-wider">
            IMPORTANT DATES
          </h3>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#667085]">
          Calendar Timeline ({dates.length})
        </span>
      </div>

      <div className="space-y-3">
        {dates.map((d, idx) => {
          const isCritical = d.priority === 'Critical';
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                isCritical
                  ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
                  : 'bg-white border-[#E5E7EB] text-[#111827]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-[#111827] flex flex-col items-center justify-center border border-[#E5E7EB] shadow-xs flex-shrink-0">
                  <Calendar className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div>
                  <span className="text-xs font-black block">{d.date}</span>
                  <span className="text-[11px] text-[#667085] font-medium">{d.label}</span>
                </div>
              </div>

              {isCritical && (
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#FEF2F2] text-[#EF4444] border border-[#FCA5A5] flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Critical Notice
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
