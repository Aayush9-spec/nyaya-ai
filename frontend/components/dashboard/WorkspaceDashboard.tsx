"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, GitCompare, MessageSquare, ArrowRight, AlertTriangle, Calendar, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface WorkspaceDashboardProps {
  onNavigate: (tab: 'analyze' | 'compare' | 'documents') => void;
  onSelectSample: () => void;
  analysis: any;
  filename: string | null;
  language: Language;
}

export const WorkspaceDashboard: React.FC<WorkspaceDashboardProps> = ({
  onNavigate,
  onSelectSample,
  analysis,
  filename,
  language,
}) => {
  const t = translations[language].dashboard;

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const sampleRecentDocs = [
    {
      name: filename || 'Rental_Agreement.pdf',
      type: 'Rental Agreement',
      date: 'Today',
      highRisks: analysis ? analysis.risk_breakdown?.filter((r: any) => r.severity === 'High').length || 2 : 2,
      mediumRisks: analysis ? analysis.risk_breakdown?.filter((r: any) => r.severity === 'Medium').length || 3 : 3,
      riskScore: analysis ? analysis.risk_score : 72,
    },
    {
      name: 'Employment_Contract_v2.pdf',
      type: 'Employment',
      date: 'Yesterday',
      highRisks: 1,
      mediumRisks: 2,
      riskScore: 42,
    },
  ];

  return (
    <div className="space-y-8 py-6">
      {/* Heading & Subheading */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs">
        <div>
          <h2 className="text-2xl font-black text-[#111827] tracking-tight">
            {getTimeGreeting()}
          </h2>
          <p className="text-xs text-[#667085] font-medium mt-0.5">Your legal workspace</p>
        </div>

        <button
          onClick={onSelectSample}
          className="px-4 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Try Sample Analysis
        </button>
      </div>

      {/* 3 Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => onNavigate('analyze')}
          className="saas-card p-6 text-left hover:border-[#CBD5E1] transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <FileText className="w-6 h-6" />
            </div>
            <ArrowRight className="w-4 h-4 text-[#667085] group-hover:text-[#111827] group-hover:translate-x-0.5 transition-all" />
          </div>
          <div>
            <h3 className="font-bold text-[#111827] text-base uppercase tracking-wider text-xs text-[#667085]">
              ANALYZE DOCUMENT
            </h3>
            <p className="text-xs text-[#111827] mt-1 font-semibold">
              "Upload a contract or legal notice"
            </p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => onNavigate('compare')}
          className="saas-card p-6 text-left hover:border-[#CBD5E1] transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <GitCompare className="w-6 h-6" />
            </div>
            <ArrowRight className="w-4 h-4 text-[#667085] group-hover:text-[#111827] group-hover:translate-x-0.5 transition-all" />
          </div>
          <div>
            <h3 className="font-bold text-[#111827] text-base uppercase tracking-wider text-xs text-[#667085]">
              COMPARE DOCUMENTS
            </h3>
            <p className="text-xs text-[#111827] mt-1 font-semibold">
              "Find changes, new obligations and risks"
            </p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => onNavigate('analyze')}
          className="saas-card p-6 text-left hover:border-[#CBD5E1] transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <MessageSquare className="w-6 h-6" />
            </div>
            <ArrowRight className="w-4 h-4 text-[#667085] group-hover:text-[#111827] group-hover:translate-x-0.5 transition-all" />
          </div>
          <div>
            <h3 className="font-bold text-[#111827] text-base uppercase tracking-wider text-xs text-[#667085]">
              ASK NYAYAAI
            </h3>
            <p className="text-xs text-[#111827] mt-1 font-semibold">
              "Ask questions grounded in your documents"
            </p>
          </div>
        </motion.button>
      </div>

      {/* Recent Documents Table Section */}
      <div className="saas-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <h3 className="font-bold text-[#111827] text-base flex items-center gap-2">
            <FileText className="w-4.5 h-4.5 text-[#667085]" /> Recent Documents
          </h3>
          <button
            onClick={() => onNavigate('documents')}
            className="text-xs font-semibold text-[#2563EB] hover:underline"
          >
            View All
          </button>
        </div>

        <div className="divide-y divide-[#E5E7EB]">
          {sampleRecentDocs.map((doc, idx) => (
            <div
              key={idx}
              onClick={onSelectSample}
              className="py-3.5 flex items-center justify-between hover:bg-[#F8FAFC] p-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-bold text-xs border border-[#E5E7EB]">
                  📄
                </div>
                <div>
                  <h4 className="font-bold text-[#111827] text-xs">{doc.name}</h4>
                  <p className="text-[11px] text-[#667085] font-medium">{doc.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-xs font-bold text-[#EF4444] block">
                    {doc.highRisks} high risks • {doc.mediumRisks} medium
                  </span>
                  <span className="text-[10px] text-[#667085]">{doc.date}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#667085]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
