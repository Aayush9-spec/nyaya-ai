"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, ShieldAlert, ArrowRight, Filter, Eye, Sparkles } from 'lucide-react';
import { Language, translations } from '../lib/translations';

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

  const highCount = riskBreakdown.filter((r) => r.severity.toLowerCase() === 'high').length;
  const mediumCount = riskBreakdown.filter((r) => r.severity.toLowerCase() === 'medium').length;
  const lowCount = riskBreakdown.filter((r) => r.severity.toLowerCase() === 'low').length;

  const filteredRisks = riskBreakdown.filter((risk) => {
    if (filterSeverity === 'All') return true;
    return risk.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  const getScoreColor = (score: number) => {
    if (score >= 60) return { text: 'text-rose-600', bg: 'bg-rose-500', pillBg: 'bg-rose-50 text-rose-700 border-rose-200' };
    if (score >= 30) return { text: 'text-amber-600', bg: 'bg-amber-500', pillBg: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { text: 'text-emerald-600', bg: 'bg-emerald-500', pillBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  };

  const scoreTheme = getScoreColor(riskScore);

  return (
    <div className="saas-card p-6 sm:p-8 space-y-6">
      {/* Header & Gauge Meter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-slate-900">{t.title}</h3>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              Statutory Audit
            </span>
          </div>
          <p className="text-xs text-slate-500 font-normal">{t.subtitle}</p>
        </div>

        {/* Risk Score Radial/Progress Bar */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 w-full sm:w-auto">
          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
              Score
            </span>
            <div className="flex items-baseline gap-1 justify-end">
              <span className={`text-3xl font-black ${scoreTheme.text}`}>{riskScore}</span>
              <span className="text-xs font-semibold text-slate-400">/ 100</span>
            </div>
          </div>
          <div className="w-24 bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full ${scoreTheme.bg} transition-all duration-700 rounded-full`}
              style={{ width: `${Math.min(riskScore, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* High / Medium / Low Risk Count Pills & Severity Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Count Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            {highCount} High Risk
          </span>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            {mediumCount} Medium Risk
          </span>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {lowCount} Low Risk
          </span>
        </div>

        {/* Severity Filter Chips */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs">
          {(['All', 'High', 'Medium', 'Low'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterSeverity === sev
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
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
              transition={{ delay: index * 0.05 }}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-400 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isHigh
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : isMedium
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {risk.severity} Severity
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {risk.clause || 'Clause Reference'}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">{risk.issue}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5 font-normal">
                  {risk.explanation}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Impact: {risk.impact}</span>
                </span>

                {onViewSourceClause && (
                  <button
                    onClick={() => onViewSourceClause(risk.issue)}
                    className="text-blue-600 hover:underline text-[11px] font-bold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> {t.viewSource}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Plan Trigger CTA */}
      {!hasActionPlan && (
        <button
          onClick={onGenerateActionPlan}
          disabled={loading}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-xs transition-all shadow-sm active:scale-[0.99] disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Action Plan...
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
