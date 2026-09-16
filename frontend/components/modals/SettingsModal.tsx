"use client";

import React, { useEffect, useState } from 'react';
import { X, Settings, Activity, ShieldCheck, Zap, Award, Server } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, language }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    async function fetchEval() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/evaluate`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchEval();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0F172A] text-white flex items-center justify-center font-bold">
              <Settings className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-[#111827] text-base">Settings & Developer Metrics</h3>
              <p className="text-xs text-[#667085]">AI accuracy, security audit & benchmark logs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#667085] hover:text-[#111827] rounded-xl hover:bg-[#F1F5F9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#F7F8FC]">
          {loading ? (
            <div className="text-center py-8 text-xs font-bold text-[#667085]">
              Fetching quality benchmark telemetry...
            </div>
          ) : (
            <>
              {/* Benchmark Latency Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="saas-card p-4 space-y-1">
                  <span className="text-[10px] font-extrabold text-[#667085] uppercase tracking-wider block">
                    Avg Latency
                  </span>
                  <div className="text-2xl font-black text-[#111827]">{data?.metrics?.avg_response_time}</div>
                  <span className="text-[10px] text-[#667085] font-medium">Grounded RAG Pipeline</span>
                </div>

                <div className="saas-card p-4 space-y-1">
                  <span className="text-[10px] font-extrabold text-[#667085] uppercase tracking-wider block">
                    QA Accuracy
                  </span>
                  <div className="text-2xl font-black text-[#10B981]">{data?.metrics?.grounded_qa_accuracy}</div>
                  <span className="text-[10px] text-[#667085] font-medium">Source Grounding</span>
                </div>

                <div className="saas-card p-4 space-y-1">
                  <span className="text-[10px] font-extrabold text-[#667085] uppercase tracking-wider block">
                    Hallucinations
                  </span>
                  <div className="text-2xl font-black text-[#EF4444]">{data?.metrics?.hallucination_rate}</div>
                  <span className="text-[10px] text-[#667085] font-medium">Error Rate</span>
                </div>
              </div>

              {/* Detailed Metrics Table */}
              <div className="saas-card p-5 space-y-3">
                <h4 className="font-bold text-[#111827] text-xs uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#2563EB]" /> Core Model Accuracy Breakdown
                </h4>
                <div className="space-y-2">
                  {Object.entries(data?.metrics || {}).map(([key, val]: any) => (
                    <div
                      key={key}
                      className="flex justify-between items-center py-2 px-3 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-xs"
                    >
                      <span className="text-[#667085] capitalize font-medium">{key.replace(/_/g, ' ')}</span>
                      <span className="font-bold text-[#111827]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Audit */}
              <div className="saas-card p-5 space-y-3">
                <h4 className="font-bold text-[#111827] text-xs uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" /> Security Guardrail Tests
                </h4>
                <div className="space-y-2">
                  {Object.entries(data?.security_tests || {}).map(([key, val]: any) => (
                    <div
                      key={key}
                      className="flex justify-between items-center py-2 px-3 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-xs"
                    >
                      <span className="text-[#667085] capitalize font-medium">{key.replace(/_/g, ' ')}</span>
                      <span className="font-bold text-[#10B981]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#E5E7EB] bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs rounded-xl shadow-xs transition-all"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};
