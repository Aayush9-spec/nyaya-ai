"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GitCompare, FileText, Upload, Shield, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface ComparisonClause {
  clause: string;
  v1: string;
  v2: string;
  status: string;
  explanation: string;
}

interface ComparisonResult {
  comparison: ComparisonClause[];
  overall_assessment: string;
}

interface CompareViewProps {
  file1: File | null;
  file2: File | null;
  setFile1: (file: File | null) => void;
  setFile2: (file: File | null) => void;
  onCompare: () => void;
  comparison: ComparisonResult | null;
  loading: boolean;
  language: Language;
}

export const CompareView: React.FC<CompareViewProps> = ({
  file1,
  file2,
  setFile1,
  setFile2,
  onCompare,
  comparison,
  loading,
  language,
}) => {
  const t = translations[language].compare;

  return (
    <div className="space-y-8 py-6">
      {/* Dual File Upload Zone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document Version A */}
        <div className="saas-card p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-slate-400 transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">{t.fileA}</h3>
            <p className="text-xs text-slate-500 mt-0.5 font-normal">Original baseline contract PDF</p>
          </div>

          <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border border-slate-200 flex items-center gap-2">
            <Upload className="w-4 h-4 text-slate-600" />
            {file1 ? file1.name : 'Select File A'}
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={(e) => e.target.files?.[0] && setFile1(e.target.files[0])}
            />
          </label>
        </div>

        {/* Document Version B */}
        <div className="saas-card p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-slate-400 transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">{t.fileB}</h3>
            <p className="text-xs text-slate-500 mt-0.5 font-normal">Counter-proposal / revised contract PDF</p>
          </div>

          <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border border-slate-200 flex items-center gap-2">
            <Upload className="w-4 h-4 text-slate-600" />
            {file2 ? file2.name : 'Select File B'}
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={(e) => e.target.files?.[0] && setFile2(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      {/* Compare Action Button */}
      <div className="flex justify-center">
        <button
          onClick={onCompare}
          disabled={!file1 || !file2 || loading}
          className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold text-xs transition-all shadow-sm flex items-center gap-2.5 disabled:opacity-40 active:scale-95"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Auditing Clause Modifications...
            </>
          ) : (
            <>
              {t.runAudit} <GitCompare className="w-4 h-4 text-blue-400" />
            </>
          )}
        </button>
      </div>

      {/* Comparison Results */}
      {comparison && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="saas-card p-6 sm:p-8 space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{t.title}</h3>
              <p className="text-xs text-slate-500 font-normal">{t.subtitle}</p>
            </div>
          </div>

          {/* Diff Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">{t.clauseHeader}</th>
                  <th className="py-3 px-4">{t.versionA}</th>
                  <th className="py-3 px-4">{t.versionB}</th>
                  <th className="py-3 px-4">{t.riskHeader}</th>
                  <th className="py-3 px-4">{t.explanationHeader}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparison.comparison.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {item.clause}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 leading-relaxed max-w-xs">{item.v1}</td>
                    <td className="py-3.5 px-4 text-slate-600 leading-relaxed max-w-xs">{item.v2}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                          item.status.includes('🔴')
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : item.status.includes('🟠')
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-normal leading-relaxed">
                      {item.explanation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Overall Assessment Box */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>{t.overallAssessment}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              {comparison.overall_assessment}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
