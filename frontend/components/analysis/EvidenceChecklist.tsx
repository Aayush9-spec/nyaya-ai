"use client";

import React, { useState } from 'react';
import { ClipboardList, Check } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface EvidenceChecklistProps {
  language: Language;
  items?: string[];
}

export const EvidenceChecklist: React.FC<EvidenceChecklistProps> = ({ language, items }) => {
  const defaultItems =
    items && items.length > 0
      ? items
      : [
          'Original agreement copy',
          'Payment receipts & transaction UTRs',
          'Bank account statements',
          'Email correspondence history',
          'WhatsApp / text message logs',
          'Previous written notices & letters',
          'Identity & official contact records',
        ];

  const [checked, setChecked] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  });

  const toggleItem = (idx: number) => {
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / defaultItems.length) * 100);

  return (
    <div className="saas-card p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4.5 h-4.5 text-[#2563EB]" />
          <h3 className="font-bold text-[#111827] text-sm uppercase tracking-wider">
            EVIDENCE TO GATHER
          </h3>
        </div>
        <span className="text-xs font-bold text-[#2563EB]">
          {completedCount} / {defaultItems.length} completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
        <div
          className="bg-[#2563EB] h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checkboxes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {defaultItems.map((item, idx) => {
          const isDone = !!checked[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleItem(idx)}
              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer select-none transition-all ${
                isDone
                  ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]'
                  : 'bg-white border-[#E5E7EB] text-[#111827] hover:border-[#CBD5E1]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                  isDone
                    ? 'bg-[#10B981] border-[#10B981] text-white'
                    : 'border-[#CBD5E1] bg-white'
                }`}
              >
                {isDone && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className={`text-xs font-medium ${isDone ? 'line-through opacity-75' : ''}`}>
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
