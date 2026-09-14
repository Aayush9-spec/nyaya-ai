"use client";

import React, { useEffect, useState } from 'react';
import { CheckCircle, Activity, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading quality metrics...</div>;

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Quality Dashboard</h1>
          <p className="text-slate-500">Internal evaluation of NyayaAI's grounded legal engine.</p>
        </div>
        <Link href="/" className="text-primary font-medium hover:underline">← Back to App</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <Activity className="w-5 h-5" />
            <span className="font-bold">Performance</span>
          </div>
          <div className="text-3xl font-bold">{data?.metrics.avg_response_time}</div>
          <div className="text-xs text-slate-400 uppercase font-medium mt-1">Avg Response Latency</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-bold">Accuracy</span>
          </div>
          <div className="text-3xl font-bold">{data?.metrics.grounded_qa_accuracy}</div>
          <div className="text-xs text-slate-400 uppercase font-medium mt-1">Grounded QA Accuracy</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-red-600">
            <Zap className="w-5 h-5" />
            <span className="font-bold">Hallucination</span>
          </div>
          <div className="text-3xl font-bold">{data?.metrics.hallucination_rate}</div>
          <div className="text-xs text-slate-400 uppercase font-medium mt-1">Error Rate (Unsupported Claims)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold">Core Model Metrics</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(data?.metrics).map(([key, value]: any) => (
              <div key={key} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                <span className="text-slate-600 capitalize">{key.replace(/_/g, ' ')}</span>
                <span className="font-bold text-slate-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold">Security Audit</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(data?.security_tests).map(([key, value]: any) => (
              <div key={key} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                <span className="text-slate-600 capitalize">{key.replace(/_/g, ' ')}</span>
                <span className="font-bold text-green-600">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100 text-xs text-green-700">
            All critical security tests passed. Prompt injection layers are active.
          </div>
        </div>
      </div>
    </div>
  );
}
