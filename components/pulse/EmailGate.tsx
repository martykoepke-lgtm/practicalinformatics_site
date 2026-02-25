'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowIcon } from '@/components/ui/Button';

interface EmailGateProps {
  onComplete: () => void;
}

export default function EmailGate({ onComplete }: EmailGateProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim()) {
      setError('Please fill in both fields.');
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_SHEET_ENDPOINT;
    if (!endpoint) {
      // No endpoint configured — skip gate silently
      localStorage.setItem('pulse_access', 'true');
      onComplete();
      return;
    }

    setSubmitting(true);
    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      // no-cors returns opaque response, so we trust it went through
      localStorage.setItem('pulse_access', 'true');
      onComplete();
    } catch {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      className="mx-auto max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white">Before we start</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          You&apos;re about to use the AI Fit Diagnostic — a free tool that helps you
          figure out which of your pain points are real AI candidates and which ones
          need a people or process fix first. Enter your info to get started.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="gate-name" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Name
            </label>
            <input
              id="gate-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-steel/50 focus:bg-white/[0.07]"
            />
          </div>
          <div>
            <label htmlFor="gate-email" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Email
            </label>
            <input
              id="gate-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-steel/50 focus:bg-white/[0.07]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={submitting}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-xl bg-burnt px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_15px_rgba(230,126,34,0.3)] transition-colors hover:bg-burnt-dim ${submitting ? 'opacity-60' : ''}`}
              whileHover={submitting ? undefined : { scale: 1.05, boxShadow: '0 8px 30px rgba(230, 126, 34, 0.4)' }}
              whileTap={submitting ? undefined : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {submitting ? 'Starting...' : 'Start the Diagnostic'} <ArrowIcon />
            </motion.button>
          </div>
        </form>

        <p className="mt-6 text-xs text-slate-600">
          Free. No spam. Your data stays with you.
        </p>
      </div>
    </motion.div>
  );
}
