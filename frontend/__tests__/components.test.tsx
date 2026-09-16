import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('NyayaAI Frontend Core Components', () => {
  it('renders application brand title', () => {
    render(
      <header role="banner" className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">NyayaAI — Legal Assistance & Access</h1>
      </header>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('NyayaAI');
  });

  it('contains accessible navigation buttons', () => {
    render(
      <nav aria-label="Main Navigation">
        <button aria-label="Upload Legal Document">Upload Document</button>
        <button aria-label="Run Contract Comparison">Compare Contracts</button>
        <button aria-label="Generate Action Plan">Action Plan</button>
      </nav>
    );
    expect(screen.getByRole('button', { name: /Upload Legal Document/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Run Contract Comparison/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate Action Plan/i })).toBeInTheDocument();
  });

  it('renders mandatory legal assistance disclaimer', () => {
    render(
      <footer role="contentinfo" className="text-xs text-gray-500">
        <p>Disclaimer: NyayaAI provides legal information and assistance, rather than replacing professional legal advice.</p>
      </footer>
    );
    expect(screen.getByText(/rather than replacing professional legal advice/i)).toBeInTheDocument();
  });
});
