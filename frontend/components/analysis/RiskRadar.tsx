"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, ArrowRight, Filter, Eye, Sparkles } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface RiskItem {
  issue: string;
  severity: 'High' | 'Medium' | 'Low' | string;
  explanation: string;
  impact: string;
  clause?: string;
  page?: number;
}

interface RiskRadarProps {
  riskScore: number;
  riskBreakdown: RiskItem[];
  onGenerateActionPlan: () => void;
  hasActionPlan: boolean;
  loading: boolean;
  onViewSourceClause?: (issueTitle: string) => void;
  language: Language;
}

export const RiskRadar: React.FC<RiskRadarProps> = ({
  riskScore,
  riskBreakdown,
  onGenerateActionPlan,
  hasActionPlan,
  loading,
  onViewSourceClause,
  language,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const t = translations[language].riskRadar;

  const filteredRisks = riskBreakdown.filter((risk) => {
    if (filterSeverity === 'All') return true;
    return risk.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  return (
    <div className="saas-card p-6 sm:p-8 space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <h3 className="text-xl font-bold text-[#111827]">{t.title}</h3>
          <p className="text-xs text-[#667085] font-normal">{t.subtitle}</p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl border border-[#E5E7EB] text-xs">
          {(['All', 'High', 'Medium', 'Low'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterSeverity === sev
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#667085] hover:text-[#111827]'
              }`}
            >
              {sev === 'All'
                ? t.filterAll
                : sev === 'High'
                ? t.filterHigh
                : sev === 'Medium'
                ? t.filterMedium
                : t.filterLow}
            </button>
          ))}
        </div>
      </div>

      {/* Risks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRisks.map((risk, index) => {
          const isHigh = risk.severity.toLowerCase() === 'high';
          const isMedium = risk.severity.toLowerCase() === 'medium';
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="p-5 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#CBD5E1] transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isHigh
                        ? 'bg-[#FEF2F2] text-[#EF4444] border border-[#FCA5A5]'
                        : isMedium
                        ? 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]'
                        : 'bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]'
                    }`}
                  >
                    {isHigh ? '🔴 HIGH' : isMedium ? '🟠 MEDIUM' : '🟢 LOW'}
                  </span>
                  <span className="text-[10px] font-bold text-[#667085]">
                    {risk.clause || 'Clause 8 • Page 4'}
                  </span>
                </div>

                <h4 className="font-bold text-[#111827] text-sm">{risk.issue}</h4>
                <p className="text-xs text-[#667085] leading-relaxed mt-1.5 font-normal">
                  {risk.explanation}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-semibold text-[#667085]">
                <span className="flex items-center gap-1 text-[11px]">
                  <Shield className="w-3.5 h-3.5 text-[#667085]" />
                  <span>Impact: {risk.impact}</span>
                </span>

                {onViewSourceClause && (
                  <button
                    onClick={() => onViewSourceClause(risk.issue)}
                    className="text-[#2563EB] hover:underline text-[11px] font-bold flex items-center gap-1"
                  >
                    View source →
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Generate Action Plan Trigger */}
      {!hasActionPlan && (
        <button
          onClick={onGenerateActionPlan}
          disabled={loading}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white py-3.5 rounded-xl font-bold text-xs transition-all shadow-xs active:scale-[0.99] disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Step-by-Step Action Plan...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-400" /> Generate Step-by-Step Action Plan{' '}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
};
