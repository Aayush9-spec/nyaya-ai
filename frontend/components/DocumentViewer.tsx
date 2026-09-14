"use client";

import React from 'react';
import { FileText, Eye, BookOpen, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface ClauseItem {
  title: string;
  originalText: string;
  simpleExplanation: string;
  whyItMatters: string;
  potentialRisk: string;
  severity: 'High' | 'Medium' | 'Low' | string;
  pageNumber: number;
}

interface DocumentViewerProps {
  filename: string;
  clauses: ClauseItem[];
  onSelectClause: (clause: ClauseItem) => void;
  language: Language;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  filename,
  clauses,
  onSelectClause,
  language,
}) => {
  return (
    <div className="saas-card p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">{filename}</h3>
            <p className="text-[11px] text-slate-400 font-medium">Extracted Clauses & References</p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          {clauses.length} Extracted Clauses
        </span>
      </div>

      {/* Clause List */}
      <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
        {clauses.map((clause, idx) => {
          const isHigh = clause.severity === 'High';
          const isMedium = clause.severity === 'Medium';
          return (
            <div
              key={idx}
              onClick={() => onSelectClause(clause)}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-400 bg-white transition-all cursor-pointer group space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-slate-900 text-xs group-hover:text-blue-600 transition-colors">
                  {clause.title}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                      isHigh
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : isMedium
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {clause.severity}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>

              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-mono">
                "{clause.originalText}"
              </p>

              <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 font-medium">
                <span>Page {clause.pageNumber}</span>
                <span className="text-blue-600 group-hover:underline">Click for Deep Dive →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
