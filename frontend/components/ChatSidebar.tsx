"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Send, BookOpen, ShieldCheck, Loader2 } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface ChatMessage {
  query: string;
  answer: {
    answer: string;
    citations: Array<{ page?: number; source?: string; quote?: string }>;
  };
}

interface ChatSidebarProps {
  chat: ChatMessage[];
  query: string;
  setQuery: (q: string) => void;
  onAsk: (customQuery?: string) => void;
  loading: boolean;
  hasDocument: boolean;
  language: Language;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chat,
  query,
  setQuery,
  onAsk,
  loading,
  hasDocument,
  language,
}) => {
  const t = translations[language].chat;

  const suggestedQuestions = [
    'Is the security deposit fully refundable?',
    'What is the mandatory notice period for termination?',
    'Who is responsible for repairs and damages?',
    'Can the landlord increase rent during the lease term?',
  ];

  const handleChipClick = (q: string) => {
    setQuery(q);
    onAsk(q);
  };

  return (
    <div className="saas-card p-6 flex flex-col h-[calc(100vh-140px)] sticky top-24 overflow-hidden">
      {/* Drawer Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{t.title}</h3>
            <p className="text-[11px] text-slate-400 font-medium">{t.subtitle}</p>
          </div>
        </div>

        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ShieldCheck className="w-3 h-3" /> Source Citation
        </span>
      </div>

      {/* Suggested Question Chips */}
      {chat.length === 0 && (
        <div className="pt-4 flex-shrink-0">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
            {t.suggestedTitle}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(q)}
                disabled={!hasDocument || loading}
                className="text-left text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 p-2.5 rounded-xl border border-slate-200 transition-all font-medium disabled:opacity-40"
              >
                💡 {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {chat.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs font-bold text-slate-800">Ask any legal question</p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xs leading-relaxed">
              Query specific clauses, lock-in periods, liabilities, or statutory rights grounded in your PDF.
            </p>
          </div>
        ) : (
          chat.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {/* User Question */}
              <div className="flex justify-end">
                <div className="bg-slate-900 text-white p-3 rounded-xl rounded-tr-none text-xs font-medium max-w-[85%] leading-relaxed">
                  {msg.query}
                </div>
              </div>

              {/* AI Answer */}
              <div className="flex justify-start">
                <div className="bg-slate-50 p-4 rounded-xl rounded-tl-none text-xs border border-slate-200 text-slate-800 max-w-[90%] space-y-3">
                  <p className="leading-relaxed font-normal whitespace-pre-line">
                    {msg.answer.answer}
                  </p>

                  {/* Sources Bar */}
                  {msg.answer.citations && msg.answer.citations.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/80 flex flex-wrap gap-1.5 items-center text-[10px]">
                      <span className="font-bold text-slate-400 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-slate-400" /> {t.sources}:
                      </span>
                      {msg.answer.citations.map((cite, j) => {
                        const isKB = cite.source === 'legal_kb';
                        return (
                          <span
                            key={j}
                            className={`px-2 py-0.5 rounded-full font-bold border ${
                              isKB
                                ? 'bg-amber-50 border-amber-200 text-amber-700'
                                : 'bg-blue-50 border-blue-200 text-blue-700'
                            }`}
                          >
                            {isKB ? t.statute : `${t.page} ${cite.page}`}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-xl text-xs text-slate-600 font-medium animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            <span>AI is referencing contract context...</span>
          </div>
        )}
      </div>

      {/* Query Input */}
      <div className="pt-3 border-t border-slate-100 flex-shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAsk();
          }}
          className="relative"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={!hasDocument || loading}
            placeholder={
              hasDocument ? t.placeholder : 'Upload a contract to ask questions...'
            }
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-xs font-normal bg-slate-50 focus:bg-white transition-all disabled:opacity-40"
          />
          <button
            type="submit"
            disabled={!hasDocument || !query.trim() || loading}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
