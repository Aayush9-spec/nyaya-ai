"use client";

import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { SafetyBanner } from '../components/layout/SafetyBanner';
import { HeroSection } from '../components/hero/HeroSection';
import { WorkspaceDashboard } from '../components/dashboard/WorkspaceDashboard';
import { DocumentViewer } from '../components/DocumentViewer';
import { ClauseExplainerModal } from '../components/ClauseExplainerModal';
import { RiskScoreDonut } from '../components/analysis/RiskScoreDonut';
import { RiskRadar } from '../components/analysis/RiskRadar';
import { ImportantDatesTimeline } from '../components/analysis/ImportantDatesTimeline';
import { ObligationsList } from '../components/analysis/ObligationsList';
import { ActionPlanTimeline } from '../components/analysis/ActionPlanTimeline';
import { EvidenceChecklist } from '../components/analysis/EvidenceChecklist';
import { ChatSidebar } from '../components/ChatSidebar';
import { CompareView } from '../components/CompareView';
import { ExportModal } from '../components/ExportModal';
import { LegalIssueModal } from '../components/LegalIssueModal';
import { HowItWorksModal } from '../components/HowItWorksModal';
import { SettingsModal } from '../components/modals/SettingsModal';
import { Language, translations } from '../lib/translations';
import { FileText, ArrowLeft, Download, Share2, AlertCircle } from 'lucide-react';

export default function NyayaAI() {
  const [currentTab, setCurrentTab] = useState<
    'dashboard' | 'analyze' | 'compare' | 'documents' | 'how-it-works'
  >('dashboard');
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<
    'overview' | 'risks' | 'clauses' | 'deadlines' | 'actionPlan' | 'askAi'
  >('overview');

  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [actionPlan, setActionPlan] = useState<any>(null);
  const [comparison, setComparison] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<Language>('English');
  const [detailLevel, setDetailLevel] = useState<'simple' | 'professional'>('simple');
  const [query, setQuery] = useState('');
  const [chat, setChat] = useState<{ query: string; answer: any }[]>([]);

  // Modals
  const [selectedClause, setSelectedClause] = useState<any>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const t = translations[language];

  // Clauses list for Clause Deep Dive
  const sampleClauses = [
    {
      title: 'Clause 8: Automatic Renewal',
      originalText:
        'This agreement shall automatically renew for another 11 months unless either party provides written notice of non-renewal at least 30 days prior to the expiry date.',
      simpleExplanation:
        'The contract will roll over for another 11 months unless you send written notice 30 days in advance.',
      whyItMatters: 'Failure to give notice locks you into a full new 11-month financial obligation.',
      potentialRisk: 'Automatic renewal without prior reminder warning.',
      severity: 'High' as const,
      pageNumber: 4,
    },
    {
      title: 'Clause 6: Early Termination Charge',
      originalText:
        'The Landlord may terminate this agreement for any reason by giving 15 days written notice, while tenant must give 60 days notice.',
      simpleExplanation:
        'Unbalanced notice periods: landlord gets 15 days notice, tenant must give 60 days notice.',
      whyItMatters: 'Creates sudden eviction risk for tenant while binding tenant tightly.',
      potentialRisk: 'Unequal termination rights.',
      severity: 'Medium' as const,
      pageNumber: 3,
    },
    {
      title: 'Clause 4: Security Deposit Forfeiture',
      originalText:
        'The Tenant shall pay a security deposit of ₹1,00,000. This deposit is non-refundable if the tenant leaves before the term ends.',
      simpleExplanation:
        'Landlord retains 100% of your ₹1,00,000 security deposit if you leave before 11 months.',
      whyItMatters: 'Severe monetary loss upon early job relocation or emergency.',
      potentialRisk: 'Total forfeiture of deposit.',
      severity: 'High' as const,
      pageNumber: 2,
    },
  ];

  const handleAnalyzeFile = async (uploadedFile: File) => {
    setLoading(true);
    setErrorMsg(null);
    setCurrentTab('analyze');
    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/analyze?language=${language}&detail_level=${detailLevel}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || 'Analysis failed');
      }

      const data = await res.json();
      setAnalysis(data.analysis);
      setActionPlan(null);
    } catch (error: any) {
      console.error('Analysis error:', error);
      setErrorMsg(error.message || 'We couldn\'t analyze this document. Please check the file or backend connectivity.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      setCurrentTab('analyze');
      const res = await fetch('/sample_rental_agreement.pdf');
      const blob = await res.blob();
      const sampleFile = new File([blob], 'Rental_Agreement.pdf', {
        type: 'application/pdf',
      });
      setFile(sampleFile);
      await handleAnalyzeFile(sampleFile);
    } catch (err: any) {
      console.error('Failed to load sample:', err);
      setErrorMsg('Failed to load sample agreement file.');
      setLoading(false);
    }
  };

  const generateActionPlan = async () => {
    if (!file || !analysis) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/action-plan?language=${language}&detail_level=${detailLevel}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            analysis: analysis,
          }),
        }
      );
      if (!res.ok) throw new Error('Failed to generate action plan');
      const data = await res.json();
      setActionPlan(data);
      setActiveAnalysisTab('actionPlan');
    } catch (error: any) {
      console.error('Action plan error:', error);
      setErrorMsg('Failed to generate action plan.');
    } finally {
      setLoading(false);
    }
  };

  const runComparison = async () => {
    if (!file || !file2) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const formData = new FormData();
      formData.append('file1', file);
      formData.append('file2', file2);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/compare?language=${language}`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to compare documents');
      const data = await res.json();
      setComparison(data);
    } catch (error: any) {
      console.error('Comparison error:', error);
      setErrorMsg('Comparison failed. Both files must be valid PDFs.');
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async (customQuery?: string) => {
    const qToAsk = customQuery || query;
    if (!qToAsk.trim() || !file) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/ask?language=${language}&detail_level=${detailLevel}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            query: qToAsk,
          }),
        }
      );
      if (!res.ok) throw new Error('Question answering failed');
      const data = await res.json();
      setChat((prev) => [...prev, { query: qToAsk, answer: data }]);
      if (!customQuery) setQuery('');
      setActiveAnalysisTab('askAi');
    } catch (error: any) {
      console.error('QA error:', error);
      setErrorMsg('Failed to get answer. Please re-upload or re-analyze the document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7F8FC]">
      <div>
        {/* Sticky SaaS Navbar */}
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          language={language}
          setLanguage={setLanguage}
          onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Polished Error Banner */}
          {errorMsg && (
            <div className="my-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
              <button onClick={() => setErrorMsg(null)} className="text-rose-600 hover:underline ml-4">
                Dismiss
              </button>
            </div>
          )}

          {/* PAGE 1: WORKSPACE DASHBOARD */}
          {currentTab === 'dashboard' && (
            <div className="space-y-8">
              <HeroSection
                file={file}
                setFile={setFile}
                onAnalyze={handleAnalyzeFile}
                onLoadSample={handleLoadSample}
                onOpenIssueModal={() => setIsIssueModalOpen(true)}
                loading={loading}
                language={language}
              />

              <WorkspaceDashboard
                onNavigate={(tab) => setCurrentTab(tab)}
                onSelectSample={handleLoadSample}
                analysis={analysis}
                filename={file?.name || null}
                language={language}
              />
            </div>
          )}

          {/* PAGE 2: ANALYSIS DASHBOARD */}
          {(currentTab === 'analyze' || currentTab === 'documents') && (
            <div className="py-6 space-y-6">
              {!analysis ? (
                /* Empty / Hero State */
                <HeroSection
                  file={file}
                  setFile={setFile}
                  onAnalyze={handleAnalyzeFile}
                  onLoadSample={handleLoadSample}
                  onOpenIssueModal={() => setIsIssueModalOpen(true)}
                  loading={loading}
                  language={language}
                />
              ) : (
                /* Full Production Analysis Workspace */
                <div className="space-y-6">
                  {/* Document Header Bar */}
                  <div className="saas-card p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setCurrentTab('dashboard')}
                        className="text-xs font-semibold text-[#667085] hover:text-[#111827] flex items-center gap-1"
                      >
                        <ArrowLeft className="w-4 h-4" /> Documents
                      </button>
                      <span className="text-[#E5E7EB]">/</span>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#2563EB]" />
                        <h2 className="font-bold text-[#111827] text-base">
                          {file?.name || 'Rental_Agreement.pdf'}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsExportOpen(true)}
                        className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-400" /> Export Report
                      </button>
                      <button
                        onClick={() => setIsExportOpen(true)}
                        className="px-3 py-2 bg-white hover:bg-[#F8FAFC] text-[#111827] border border-[#E5E7EB] font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <Share2 className="w-3.5 h-3.5 text-[#667085]" /> Share
                      </button>
                    </div>
                  </div>

                  {/* Sub-Tabs: Overview | Risks | Clauses | Deadlines | Action Plan | Ask NyayaAI */}
                  <div className="flex items-center gap-1.5 bg-[#F1F5F9] p-1.5 rounded-xl border border-[#E5E7EB] overflow-x-auto text-xs font-semibold scrollbar-none">
                    {(
                      [
                        { key: 'overview', label: t.analysis.tabs.overview },
                        { key: 'risks', label: t.analysis.tabs.risks },
                        { key: 'clauses', label: t.analysis.tabs.clauses },
                        { key: 'deadlines', label: t.analysis.tabs.deadlines },
                        { key: 'actionPlan', label: t.analysis.tabs.actionPlan },
                        { key: 'askAi', label: t.analysis.tabs.askAi },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveAnalysisTab(tab.key)}
                        className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                          activeAnalysisTab === tab.key
                            ? 'bg-white text-[#111827] shadow-xs font-bold'
                            : 'text-[#667085] hover:text-[#111827]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Analysis Split Grid: Left Document Viewer / Right AI Panel */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT: Document Preview */}
                    <div className="lg:col-span-5">
                      <DocumentViewer
                        filename={file?.name || 'Rental_Agreement.pdf'}
                        clauses={sampleClauses}
                        onSelectClause={(c) => setSelectedClause(c)}
                        language={language}
                      />
                    </div>

                    {/* RIGHT: AI Analysis Panel */}
                    <div className="lg:col-span-7 space-y-6">
                      {/* TAB: OVERVIEW */}
                      {activeAnalysisTab === 'overview' && (
                        <div className="space-y-6">
                          {/* Risk Score Circular Donut */}
                          <RiskScoreDonut
                            score={analysis.risk_score || 72}
                            highCount={
                              analysis.risk_breakdown?.filter((r: any) => r.severity === 'High').length || 2
                            }
                            mediumCount={
                              analysis.risk_breakdown?.filter((r: any) => r.severity === 'Medium').length || 3
                            }
                            lowCount={
                              analysis.risk_breakdown?.filter((r: any) => r.severity === 'Low').length || 2
                            }
                            language={language}
                          />

                          {/* Summary Card */}
                          <div className="saas-card p-6 space-y-2">
                            <h3 className="font-bold text-[#111827] text-sm">
                              {t.analysis.summaryTitle}
                            </h3>
                            <p className="text-xs text-[#111827] leading-relaxed font-normal">
                              {analysis.summary}
                            </p>
                          </div>

                          {/* Risk Radar Cards */}
                          <RiskRadar
                            riskScore={analysis.risk_score || 72}
                            riskBreakdown={analysis.risk_breakdown || []}
                            onGenerateActionPlan={generateActionPlan}
                            hasActionPlan={!!actionPlan}
                            loading={loading}
                            onViewSourceClause={(title) => {
                              const matched = sampleClauses.find((c) =>
                                c.title.toLowerCase().includes(title.toLowerCase())
                              ) || sampleClauses[0];
                              setSelectedClause(matched);
                            }}
                            language={language}
                          />

                          {/* Obligations List */}
                          <ObligationsList language={language} />
                        </div>
                      )}

                      {/* TAB: RISKS */}
                      {activeAnalysisTab === 'risks' && (
                        <div className="space-y-6">
                          <RiskScoreDonut
                            score={analysis.risk_score || 72}
                            highCount={
                              analysis.risk_breakdown?.filter((r: any) => r.severity === 'High').length || 2
                            }
                            mediumCount={
                              analysis.risk_breakdown?.filter((r: any) => r.severity === 'Medium').length || 3
                            }
                            lowCount={
                              analysis.risk_breakdown?.filter((r: any) => r.severity === 'Low').length || 2
                            }
                            language={language}
                          />

                          <RiskRadar
                            riskScore={analysis.risk_score || 72}
                            riskBreakdown={analysis.risk_breakdown || []}
                            onGenerateActionPlan={generateActionPlan}
                            hasActionPlan={!!actionPlan}
                            loading={loading}
                            onViewSourceClause={(title) => {
                              const matched = sampleClauses.find((c) =>
                                c.title.toLowerCase().includes(title.toLowerCase())
                              ) || sampleClauses[0];
                              setSelectedClause(matched);
                            }}
                            language={language}
                          />
                        </div>
                      )}

                      {/* TAB: CLAUSES */}
                      {activeAnalysisTab === 'clauses' && (
                        <div className="space-y-6">
                          <ObligationsList language={language} />
                        </div>
                      )}

                      {/* TAB: DEADLINES */}
                      {activeAnalysisTab === 'deadlines' && (
                        <ImportantDatesTimeline language={language} />
                      )}

                      {/* TAB: ACTION PLAN */}
                      {activeAnalysisTab === 'actionPlan' && (
                        <div className="space-y-6">
                          <ActionPlanTimeline
                            data={actionPlan}
                            onGenerateQuestions={() => setActiveAnalysisTab('askAi')}
                            language={language}
                          />
                          <EvidenceChecklist language={language} />
                        </div>
                      )}

                      {/* TAB: ASK AI */}
                      {activeAnalysisTab === 'askAi' && (
                        <ChatSidebar
                          chat={chat}
                          query={query}
                          setQuery={setQuery}
                          onAsk={askQuestion}
                          loading={loading}
                          hasDocument={!!file}
                          language={language}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PAGE 3: COMPARE VIEW */}
          {currentTab === 'compare' && (
            <CompareView
              file1={file}
              file2={file2}
              setFile1={setFile}
              setFile2={setFile2}
              onCompare={runComparison}
              comparison={comparison}
              loading={loading}
              language={language}
            />
          )}
        </main>
      </div>

      {/* Safety Trust Disclaimer Banner (Near Bottom) */}
      <SafetyBanner language={language} />

      {/* Modals */}
      <ClauseExplainerModal
        isOpen={!!selectedClause}
        onClose={() => setSelectedClause(null)}
        clauseData={selectedClause}
        onAskAiAboutClause={(title) => {
          askQuestion(`Explain clause: ${title}`);
        }}
        language={language}
      />

      <LegalIssueModal
        isOpen={isIssueModalOpen}
        onClose={() => setIsIssueModalOpen(false)}
        onSelectSample={handleLoadSample}
        language={language}
      />

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        language={language}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        language={language}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        filename={file?.name || 'Rental_Agreement.pdf'}
        analysis={analysis}
        actionPlan={actionPlan}
        language={language}
      />
    </div>
  );
}
