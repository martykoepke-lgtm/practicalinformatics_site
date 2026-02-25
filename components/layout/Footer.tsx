'use client';

import { motion } from 'framer-motion';
import { links } from '@/lib/content';

const socialLinks = [
  { label: 'LinkedIn', href: links.linkedin },
  { label: 'Between the Clicks', href: links.book },
  { label: 'From Curious to Capable', href: links.community },
];

const policyLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Acceptable Use', href: '/acceptable-use' },
];

export default function Footer() {
  return (
    <footer className="relative px-6 pb-12 pt-8" role="contentinfo">
      {/* Fiber-optic divider */}
      <div className="glow-divider mb-12" />

      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold text-slate-300">
          Practical Informatics | Marty Koepke, MHA
        </p>
        <p className="mt-2 font-mono text-xs text-slate-600">
          P → U → L → S → E
        </p>

        {/* Social */}
        <div className="mt-6 flex items-center justify-center gap-6">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-sm text-slate-500 transition-colors hover:text-steel"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-8 text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Practical Informatics LLC
        </p>

        {/* Policy Links */}
        <div className="mt-2 flex items-center justify-center gap-3">
          {policyLinks.map((link, i) => (
            <span key={link.label}>
              <a
                href={link.href}
                className="text-xs text-slate-600 transition-colors hover:text-slate-400"
              >
                {link.label}
              </a>
              {i < policyLinks.length - 1 && (
                <span className="ml-3 text-slate-700">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
