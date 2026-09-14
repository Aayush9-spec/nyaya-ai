"use client";

import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, MessageSquare, FileText, ArrowRight, Languages, Scale, GitCompare, Zap } from 'lucide-react';
import Link from 'next/link';

export default function NyayaAI() {
  const [mode, setMode] = useState<'analyze' | 'compare'>('analyze');
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [actionPlan, setActionPlan] = useState<any>(null);
  const [comparison, setComparison] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('English');
  const [detailLevel, setDetailLevel] = useState<'simple' | 'professional'>('simple');
  const [query, setQuery] = useState('');
  const [chat, setChat] = useState<{query: string, answer: any}[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetFile: 'file1' | 'file2') => {
    if (!e.target.files?.[0]) return;
    const uploadedFile = e.target.files[0];
    
    if (targetFile === 'file1') setFile(uploadedFile);
    else setFile2(uploadedFile);

    if (mode === 'analyze' && targetFile === 'file1') {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', uploadedFile);

      try {
        const res = await fetch(`http://localhost:8000/analyze?language=${language}&detail_level=${detailLevel}`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        setAnalysis(data.analysis);
      } catch (error) {
        console.error('Analysis error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const generateActionPlan = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/action-plan?language=${language}&detail_level=${detailLevel}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file?.name,
          analysis: analysis,
        }),
      });
      const data = await res.json();
      setActionPlan(data);
    } catch (error) {
      console.error('Action plan error:', error);
    } finally {
      setLoading(false);
    }
  };

  const runComparison = async () => {
    if (!file || !file2) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file1', file);
      formData.append('file2', file2);

      const res = await fetch(`http://localhost:8000/compare?language=${language}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setComparison(data);
    } catch (error) {
      console.error('Comparison error:', error);
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async () => {
    if (!query || !file) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/ask?language=${language}&detail_level=${detailLevel}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          query: query,
        }),
      });
      const data = await res.json();
      setChat([...chat, { query, answer: data }]);
      setQuery('');
    } catch (error) {
      console.error('QA error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-primary">NyayaAI</h1>
          </div>
          <Link href="/evaluation" className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded hover:bg-slate-300 transition-colors">
            Quality Metrics
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex bg-slate-200 p-1 rounded-lg">
            <button 
              onClick={() => setMode('analyze')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'analyze' ? 'bg-white shadow-sm text-primary' : 'text-slate-600'}`}
            >
              Analyze
            </button>
            <button 
              onClick={() => setMode('compare')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'compare' ? 'bg-white shadow-sm text-primary' : 'text-slate-600'}`}
            >
              Compare
            </button>
          </div>
          <div className="flex bg-slate-200 p-1 rounded-lg">
            <button 
              onClick={() => setLanguage('English')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${language === 'English' ? 'bg-white shadow-sm text-primary' : 'text-slate-600'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLanguage('Hindi')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${language === 'Hindi' ? 'bg-white shadow-sm text-primary' : 'text-slate-600'}`}
            >
              हिन्दी
            </button>
          </div>
          <div className="flex bg-slate-200 p-1 rounded-lg">
            <button 
              onClick={() => setDetailLevel('simple')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${detailLevel === 'simple' ? 'bg-white shadow-sm text-primary' : 'text-slate-600'}`}
            >
              Simple
            </button>
            <button 
              onClick={() => setDetailLevel('professional')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${detailLevel === 'professional' ? 'bg-white shadow-sm text-primary' : 'text-slate-600'}`}
            >
              Pro
            </button>
          </div>
        </div>
      </header>

      {mode === 'analyze' ? (
        <>
          {!analysis && (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl p-20 bg-white shadow-sm">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Upload your legal document</h2>
              <p className="text-slate-500 mb-6 text-center max-w-md">
                PDFs of rental agreements, employment contracts, or legal notices.
              </p>
              <label className="cursor-pointer bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Browse Files
                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'file1')} accept=".pdf" />
              </label>
              {loading && <p className="mt-4 text-slate-500 animate-pulse">Analyzing document... Please wait.</p>}
            </div>
          )}

          {analysis && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold">Plain Language Summary</h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{analysis.summary}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-danger" />
                      <h3 className="text-lg font-bold">Legal Risk Radar</h3>
                    </div>
                    <div className="text-2xl font-bold text-danger">{analysis.risk_score}/100</div>
                  </div>
                  <div className="space-y-4">
                    {analysis.risk_breakdown.map((risk: any, i: number) => (
                      <div key={i} className="p-4 rounded-lg border border-slate-100 bg-slate-50">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                            risk.severity === 'High' ? 'bg-red-100 text-red-700' : 
                            risk.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {risk.severity}
                          </span>
                          <span className="font-semibold">{risk.issue}</span>
                        </div>
                        <p className="text-sm text-slate-600">{risk.explanation}</p>
                        <p className="text-xs text-slate-400 mt-2">Impact: {risk.impact}</p>
                      </div>
                    ))}
                  </div>
                  {!actionPlan && (
                    <button 
                      onClick={generateActionPlan}
                      disabled={loading}
                      className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      {loading ? 'Generating...' : 'Generate Action Plan'} <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {actionPlan && (
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center gap-2 mb-6">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <h3 className="text-lg font-bold">Your Personalized Action Plan</h3>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-bold text-slate-400 uppercase mb-3">Next Steps</h4>
                        <div className="space-y-3">
                          {actionPlan.action_plan.map((step: any, i: number) => (
                            <div key={i} className="flex gap-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                              <div className="font-bold text-primary">{i+1}.</div>
                              <div className="flex-1">
                                <div className="font-medium">{step.action}</div>
                                <div className="text-xs text-slate-500">Priority: {step.priority} • Deadline: {step.deadline}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-bold text-slate-400 uppercase mb-3">Evidence Checklist</h4>
                          <div className="space-y-2">
                            {actionPlan.evidence_checklist.map((item: string, i: number) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                <input type="checkbox" className="rounded border-slate-300 text-primary" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-400 uppercase mb-3">Questions for your Lawyer</h4>
                          <div className="space-y-2">
                            {actionPlan.lawyer_questions.map((q: string, i: number) => (
                              <div key={i} className="text-sm text-slate-700 p-2 bg-blue-50 rounded border border-blue-100">
                                {q}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[calc(100vh-200px)] flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold">Ask NyayaAI</h3>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {chat.length === 0 && (
                    <div className="text-center py-10 text-slate-400">
                      <p className="text-sm">Ask questions about your document.</p>
                      <p className="text-xs mt-1">Example: "What is the notice period?"</p>
                    </div>
                  )}
                  {chat.map((msg, i) => (
                    <div key={i} className="space-y-3">
                      <div className="bg-slate-100 p-3 rounded-lg rounded-tr-none text-sm ml-8">
                        {msg.query}
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg rounded-tl-none text-sm mr-8 border border-blue-100">
                        <div className="mb-2">{msg.answer.answer}</div>
                        <div className="flex flex-wrap gap-2">
                          {msg.answer.citations.map((cite: any, j: number) => (
                            <span key={j} className={`text-[10px] px-2 py-0.5 rounded border font-medium ${
                              cite.source === 'legal_kb' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white border-blue-200 text-blue-600'
                            }`}>
                              {cite.source === 'legal_kb' ? 'Statute' : `Page ${cite.page}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
                    placeholder="Ask a legal question..."
                    className="w-full p-3 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <button 
                    onClick={askQuestion}
                    disabled={loading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-8">
          {!comparison && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl p-12 bg-white shadow-sm">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-lg font-semibold mb-2">Document V1</h2>
                <label className="cursor-pointer bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm hover:bg-slate-200 transition-colors">
                  {file ? file.name : 'Select First File'}
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'file1')} accept=".pdf" />
                </label>
              </div>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl p-12 bg-white shadow-sm">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-lg font-semibold mb-2">Document V2</h2>
                <label className="cursor-pointer bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm hover:bg-slate-200 transition-colors">
                  {file2 ? file2.name : 'Select Second File'}
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'file2')} accept=".pdf" />
                </label>
              </div>
            </div>
          )}

          {(!comparison || (file && file2)) && (
            <div className="flex justify-center">
              <button 
                onClick={runComparison}
                disabled={loading || !file || !file2}
                className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-slate-300"
              >
                {loading ? 'Comparing...' : 'Run Clause Comparison'} <GitCompare className="w-5 h-5" />
              </button>
            </div>
          )}

          {comparison && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-2 mb-6">
                <GitCompare className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Contract Comparison Audit</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-4 font-bold text-slate-500 text-sm">Clause</th>
                      <th className="py-3 px-4 font-bold text-slate-500 text-sm">Version 1</th>
                      <th className="py-3 px-4 font-bold text-slate-500 text-sm">Version 2</th>
                      <th className="py-3 px-4 font-bold text-slate-500 text-sm">Risk</th>
                      <th className="py-3 px-4 font-bold text-slate-500 text-sm">Audit Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.comparison.map((item: any, i: number) => (
                      <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4 font-medium text-sm">{item.clause}</td>
                        <td className="py-4 px-4 text-sm text-slate-600">{item.v1}</td>
                        <td className="py-4 px-4 text-sm text-slate-600">{item.v2}</td>
                        <td className="py-4 px-4">
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            item.status.includes('🔴') ? 'bg-red-100 text-red-700' : 
                            item.status.includes('🟠') ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-500">{item.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <h4 className="font-bold text-blue-800 mb-2">Overall Assessment</h4>
                <p className="text-blue-700 text-sm leading-relaxed">{comparison.overall_assessment}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
