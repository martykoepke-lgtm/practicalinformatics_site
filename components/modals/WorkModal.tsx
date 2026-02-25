'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/content';
import Lightbox from './Lightbox';

interface WorkModalProps {
  project: Project;
  onClose: () => void;
}

export default function WorkModal({ project, onClose }: WorkModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose, lightboxIndex]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-slate-900/95 p-8 backdrop-blur-xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Close */}
          <button
            className="absolute right-4 top-4 text-slate-400 hover:text-white"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          <p className="mt-1 text-sm text-slate-400">{project.subtitle}</p>

          {/* Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
              {project.screenshots.map((src, i) => (
                <button
                  key={i}
                  className="flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border border-white/10 transition-all hover:border-steel/50"
                  onClick={() => setLightboxIndex(i)}
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    width={200}
                    height={120}
                    className="h-28 w-auto object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Content Sections */}
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-burnt">
                The Truth
              </h4>
              <p className="mt-2 text-slate-300">{project.truth}</p>
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-steel">
                The Translation
              </h4>
              <p className="mt-2 text-slate-300">{project.translation}</p>
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                What I Learned
              </h4>
              <p className="mt-2 text-slate-300">{project.learned}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Demo Link */}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-steel px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-steel-dim"
            >
              View Demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          )}

          {/* Copyright */}
          {project.copyright && (
            <p className="mt-4 text-xs italic text-slate-600">
              {project.copyright}
            </p>
          )}
        </motion.div>

        {/* Lightbox */}
        {lightboxIndex !== null && project.screenshots && (
          <Lightbox
            images={project.screenshots}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
            altPrefix={project.title}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
