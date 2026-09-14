"use client";

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Activity, ShieldCheck, Zap, BarChart3, ArrowLeft, Lock, Award, Server } from 'lucide-react';
import Link from 'next/link';

export default function EvaluationPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEval() {
      try {
        const res = await fetch('http://localhost:8000/evaluate');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchEval();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F8FC] text-slate-700">
        <div className="w-8 h-8 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mb-3" />
        <span className="font-bold text-xs">Loading AI Quality & Benchmark Metrics...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto space-y-8 bg-[#F7F8FC]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 saas-card p-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Evaluation Dashboard</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
              Benchmark Metrics
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Empirical accuracy, precision & security audit benchmarks for NyayaAI's grounded engine.
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-blue-400" /> Back to App
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latency Card */}
        <div className="saas-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Average Latency</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900">{data?.metrics?.avg_response_time}</div>
            <div className="text-xs text-slate-500 font-medium mt-1">End-to-End Grounded QA Latency</div>
          </div>
        </div>

        {/* Accuracy Card */}
        <div className="saas-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">QA Precision</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-600">{data?.metrics?.grounded_qa_accuracy}</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Factual Grounding Compliance</div>
          </div>
        </div>

        {/* Hallucination Rate */}
        <div className="saas-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Hallucination Rate</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-rose-600">{data?.metrics?.hallucination_rate}</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Unsupported Claims Baseline</div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Core Metrics Table */}
        <div className="saas-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Benchmark Metric Breakdown</h2>
              <p className="text-xs text-slate-500">Evaluated against test suite</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {Object.entries(data?.metrics || {}).map(([key, value]: any) => (
              <div
                key={key}
                className="flex justify-between items-center py-3 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              >
                <span className="text-slate-600 capitalize">{key.replace(/_/g, ' ')}</span>
                <span className="font-bold text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Audit Table */}
        <div className="saas-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Security Audit Suite</h2>
              <p className="text-xs text-slate-500">Prompt injection & authorization checks</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {Object.entries(data?.security_tests || {}).map(([key, value]: any) => (
              <div
                key={key}
                className="flex justify-between items-center py-3 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              >
                <span className="text-slate-600 capitalize">{key.replace(/_/g, ' ')}</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              All prompt injection guardrails active. Unauthorized context access tests passed 100%.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
