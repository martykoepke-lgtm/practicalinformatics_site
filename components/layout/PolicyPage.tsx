'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface PolicyPageProps {
  title: string;
  gettermsDocument: string;
}

export default function PolicyPage({ title, gettermsDocument }: PolicyPageProps) {
  useEffect(() => {
    // Load GetTerms embed script
    const existing = document.getElementById('getterms-embed-js');
    if (existing) {
      existing.remove();
    }
    const script = document.createElement('script');
    script.id = 'getterms-embed-js';
    script.src = 'https://gettermscdn.com/dist/js/embed.js';
    document.body.appendChild(script);

    return () => {
      const el = document.getElementById('getterms-embed-js');
      if (el) el.remove();
    };
  }, [gettermsDocument]);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl md:px-16">
        <a href="/">
          <Image
            src="/images/logo-long.png"
            alt="Practical Informatics"
            width={180}
            height={40}
            className="h-8 w-auto"
          />
        </a>
        <a
          href="/"
          className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          ← Back to Home
        </a>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-8 text-3xl font-bold text-white">{title}</h1>
        <div
          className="getterms-document-embed prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-steel prose-strong:text-white"
          data-getterms="0GN4I"
          data-getterms-document={gettermsDocument}
          data-getterms-lang="en-us"
          data-getterms-mode="direct"
          data-getterms-env="https://gettermscdn.com"
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center">
        <p className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Practical Informatics LLC
        </p>
        <div className="mt-2 flex items-center justify-center gap-3">
          {[
            { label: 'Privacy', href: '/privacy' },
            { label: 'Terms', href: '/terms' },
            { label: 'Cookies', href: '/cookies' },
            { label: 'Acceptable Use', href: '/acceptable-use' },
            { label: 'Returns', href: '/returns' },
          ].map((link, i, arr) => (
            <span key={link.label}>
              <a
                href={link.href}
                className="text-xs text-slate-600 hover:text-slate-400"
              >
                {link.label}
              </a>
              {i < arr.length - 1 && <span className="ml-3 text-slate-700">·</span>}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
