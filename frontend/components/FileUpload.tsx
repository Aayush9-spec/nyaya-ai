"use client";

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, Sparkles, AlertCircle, Trash2, ArrowRight } from 'lucide-react';

interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
  onAnalyze: (fileToAnalyze: File) => void;
  onLoadSample: () => void;
  loading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  setFile,
  onAnalyze,
  onLoadSample,
  loading
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.pdf')) {
        setFile(droppedFile);
        onAnalyze(droppedFile);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onAnalyze(selectedFile);
    }
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center rounded-3xl p-10 md:p-16 border-2 border-dashed transition-all duration-300 ${
            dragOver
              ? 'border-blue-600 bg-blue-50/80 scale-[1.01] shadow-2xl'
              : 'border-slate-300/80 bg-white/70 hover:border-blue-400 hover:bg-white/90 shadow-xl'
          } backdrop-blur-md`}
        >
          {/* Subtle Glow Background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 pointer-events-none" />

          {/* Upload Icon */}
          <div className="p-5 legal-gradient text-white rounded-3xl mb-6 shadow-xl shadow-blue-500/20 transform transition-transform group-hover:scale-110">
            <Upload className="w-10 h-10" />
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 text-center">
            Upload Your Legal Contract
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-md text-center leading-relaxed mb-8">
            Drag & drop your PDF agreement, notice, or legal document here to get instant risk analysis & action steps.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <label className="w-full sm:w-auto cursor-pointer text-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95 flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" /> Select PDF File
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleInputChange}
              />
            </label>

            <button
              type="button"
              onClick={onLoadSample}
              disabled={loading}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-4 rounded-2xl font-bold text-sm transition-all border border-slate-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> Try Sample Rental Agreement
            </button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> OCR PDF Text Extraction
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Private & Secure
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Statutory Legal KB Grounding
            </span>
          </div>
        </div>
      ) : (
        /* File Active Card */
        <div className="glass-card p-6 rounded-3xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-blue-50 text-blue-700 rounded-2xl border border-blue-100">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-lg">{file.name}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
              <p className="text-xs text-slate-500">Ready for automated legal risk evaluation</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {loading ? (
              <div className="flex items-center gap-2.5 px-5 py-3 bg-blue-50 text-blue-700 font-bold text-sm rounded-2xl animate-pulse">
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping" />
                Analyzing Document...
              </div>
            ) : (
              <button
                onClick={() => onAnalyze(file)}
                className="flex-1 md:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                Re-Analyze <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setFile(null)}
              className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors border border-slate-200"
              title="Remove File"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
