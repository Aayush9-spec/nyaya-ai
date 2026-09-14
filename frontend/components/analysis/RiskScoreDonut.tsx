"use client";

import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface RiskScoreDonutProps {
  score: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  language: Language;
}

export const RiskScoreDonut: React.FC<RiskScoreDonutProps> = ({
  score,
  highCount,
  mediumCount,
  lowCount,
  language,
}) => {
  const getSeverityLabel = (s: number) => {
    if (s >= 60) return { label: 'High Risk', color: 'text-[#EF4444]', stroke: '#EF4444', bg: 'bg-[#FEF2F2]' };
    if (s >= 30) return { label: 'Moderate Risk', color: 'text-[#F59E0B]', stroke: '#F59E0B', bg: 'bg-[#FFFBEB]' };
    return { label: 'Low Risk', color: 'text-[#10B981]', stroke: '#10B981', bg: 'bg-[#ECFDF5]' };
  };

  const status = getSeverityLabel(score);
  const strokeDashoffset = 283 - (283 * Math.min(score, 100)) / 100;

  return (
    <div className="saas-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
      {/* Donut Visualization */}
      <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={status.stroke}
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-extrabold text-[#667085] uppercase tracking-wider">
            LEGAL RISK
          </span>
          <span className={`text-2xl font-black ${status.color}`}>
            {score}<span className="text-xs font-semibold text-[#667085]">/100</span>
          </span>
        </div>
      </div>

      {/* Details & Counts */}
      <div className="flex-1 space-y-3 text-center sm:text-left">
        <div>
          <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${status.bg} ${status.color} border border-[#E5E7EB] inline-block mb-1`}>
            {status.label}
          </span>
          <p className="text-xs text-[#667085] font-normal">
            Automated statutory risk breakdown against legal standards.
          </p>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-xs font-bold">
          <span className="flex items-center gap-1.5 text-[#EF4444]">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]" /> {highCount} High
          </span>
          <span className="flex items-center gap-1.5 text-[#F59E0B]">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> {mediumCount} Medium
          </span>
          <span className="flex items-center gap-1.5 text-[#10B981]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" /> {lowCount} Low
          </span>
        </div>
      </div>
    </div>
  );
};
