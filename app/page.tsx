'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Pattern from '@/components/sections/Pattern';
import PulseFramework from '@/components/sections/PulseFramework';
import StartHere from '@/components/sections/StartHere';
import TwoLanes from '@/components/sections/TwoLanes';
import WorkWithMe from '@/components/sections/WorkWithMe';
import Community from '@/components/sections/Community';
import WhatIBuilt from '@/components/sections/WhatIBuilt';
import Background from '@/components/sections/Background';
import FAQ from '@/components/sections/FAQ';
import FooterCTA from '@/components/sections/FooterCTA';
import Footer from '@/components/layout/Footer';
import CursorGlow from '@/components/ui/CursorGlow';
import MethodologyModal from '@/components/modals/MethodologyModal';

export default function Home() {
  const [methodologyOpen, setMethodologyOpen] = useState(false);

  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero onOpenMethodology={() => setMethodologyOpen(true)} />
        <div className="glow-divider" />
        <Pattern />
        <PulseFramework />
        <StartHere onOpenMethodology={() => setMethodologyOpen(true)} />
        <TwoLanes />
        <WorkWithMe />
        <Community />
        <WhatIBuilt />
        <Background />
        <FAQ />
        <div className="glow-divider" />
        <FooterCTA onOpenMethodology={() => setMethodologyOpen(true)} />
      </main>
      <Footer />
      {methodologyOpen && (
        <MethodologyModal onClose={() => setMethodologyOpen(false)} />
      )}
    </>
  );
}
