"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, GitCompare, MessageSquare, AlertTriangle, Calendar, ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface DashboardProps {
  onNavigate: (tab: 'analyze' | 'compare' | 'documents') => void;
  onSelectSample: () => void;
  analysis: any;
  filename: string | null;
  language: Language;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  onSelectSample,
  analysis,
  filename,
  language,
}) => {
  const t = translations[language].dashboard;

  const sampleRecentDocs = [
    {
      name: filename || 'sample_rental_agreement.pdf',
      type: 'Residential Rental Agreement',
      date: 'Today',
      riskScore: analysis ? analysis.risk_score : 65,
      status: 'Analyzed',
    },
    {
      name: 'employment_contract_v2.pdf',
      type: 'Employment Non-Compete Contract',
      date: 'Yesterday',
      riskScore: 42,
      status: 'Reviewed',
    },
  ];

  return (
    <div className="space-y-8 py-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.title}</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">{t.subtitle}</p>
        </div>
        <button
          onClick={onSelectSample}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-400" /> Try Sample Analysis
        </button>
      </div>

      {/* Quick Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => onNavigate('analyze')}
          className="saas-card p-6 text-left hover:border-slate-400 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center border border-slate-200">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">{t.analyzeDoc}</h3>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              Upload PDF contracts to extract risk scores, key clauses & action steps.
            </p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => onNavigate('compare')}
          className="saas-card p-6 text-left hover:border-slate-400 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center border border-slate-200">
              <GitCompare className="w-5 h-5 text-blue-600" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">{t.compareDocs}</h3>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              Audit side-by-side contract versions to catch added liabilities.
            </p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => onNavigate('analyze')}
          className="saas-card p-6 text-left hover:border-slate-400 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center border border-slate-200">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">{t.askAi}</h3>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              Grounded AI assistant with source page & statute citations.
            </p>
          </div>
        </motion.button>
      </div>

      {/* Main Split: Recent Documents & Key Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Documents Table */}
        <div className="lg:col-span-8 saas-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" /> {t.recentDocs}
            </h3>
            <button
              onClick={() => onNavigate('documents')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {sampleRecentDocs.map((doc, idx) => (
              <div
                key={idx}
                onClick={onSelectSample}
                className="py-3.5 flex items-center justify-between hover:bg-slate-50 p-2 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{doc.name}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">{doc.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Risk Score
                    </span>
                    <span className="text-xs font-black text-rose-600">{doc.riskScore}/100</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk & Deadlines Side Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Risk Summary Gauge Widget */}
          <div className="saas-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-sm">{t.riskSummaries}</h3>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-600">Active High Risk Items</span>
                <span className="text-rose-600">
                  {analysis?.risk_breakdown?.filter((r: any) => r.severity === 'High').length || 2}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full w-[60%] rounded-full" />
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Security deposit non-refundability & short termination notice clauses detected.
              </p>
            </div>
          </div>

          {/* Important Deadlines Widget */}
          <div className="saas-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">{t.importantDeadlines}</h3>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">60-Day Notice Deadline</span>
                  <span className="text-[11px] text-slate-400">Rental Agreement Clause 5a</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Nov 1, 2026
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Rent Due Date</span>
                  <span className="text-[11px] text-slate-400">Monthly on the 5th</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Monthly
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
