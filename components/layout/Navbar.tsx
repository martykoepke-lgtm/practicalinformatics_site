'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { navLinks, links } from '@/lib/content';

const pulseLetters = ['P', 'U', 'L', 'S', 'E'];
const pulseSections = ['method', 'toolkit', 'consulting', 'about', 'faq'];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLetters, setActiveLetters] = useState<boolean[]>([false, false, false, false, false]);

  // On non-homepage routes, prefix anchor links with / so they navigate home first
  const resolveHref = (href: string) => {
    if (href.startsWith('#') && pathname !== '/') {
      return `/${href}`;
    }
    return href;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > 100 && currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Intersection Observer for PULSE tracker
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    pulseSections.forEach((sectionId, index) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setActiveLetters((prev) => {
            const next = [...prev];
            next[index] = entry.isIntersecting;
            return next;
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? '' : 'hidden';
  };

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 z-50 flex w-[92%] max-w-5xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden ? -100 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <a href="/" className="relative h-8 w-44 flex-shrink-0">
          <Image
            src="/images/logo-long.png"
            alt="Practical Informatics"
            fill
            className="object-contain object-left"
            priority
          />
        </a>

        {/* PULSE Tracker */}
        <div className="hidden items-center gap-1 md:flex">
          {pulseLetters.map((letter, i) => (
            <span
              key={letter}
              className={`font-mono text-xs font-bold transition-all duration-300 ${
                activeLetters[i]
                  ? i === 3
                    ? 'text-burnt drop-shadow-[0_0_8px_rgba(230,126,34,0.6)]'
                    : 'text-steel drop-shadow-[0_0_8px_rgba(74,144,226,0.6)]'
                  : 'text-slate-600'
              }`}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={resolveHref(link.href)}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={links.bookACall}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-burnt px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-burnt-dim hover:shadow-[0_4px_16px_rgba(230,126,34,0.3)]"
          >
            Book a Call
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <motion.span
            className="block h-0.5 w-6 bg-white"
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block h-0.5 w-6 bg-white"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block h-0.5 w-6 bg-white"
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          />
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleLinkClick}
            />
            <motion.div
              className="fixed right-0 top-0 z-40 flex h-full w-72 flex-col gap-6 border-l border-white/10 bg-slate-950/95 px-8 pt-24 backdrop-blur-xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={resolveHref(link.href)}
                  className="text-lg text-slate-300 transition-colors hover:text-white"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={links.bookACall}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 rounded-lg bg-burnt px-4 py-3 text-center font-semibold text-white"
                onClick={handleLinkClick}
              >
                Book a Call
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
