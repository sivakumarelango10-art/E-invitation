import React from 'react';
import { Opening } from './components/Opening';
import { InvitationReveal } from './components/InvitationReveal';
import { SpecialDate } from './components/SpecialDate';
import { WeddingTimeline } from './components/WeddingTimeline';
import { Venue } from './components/Venue';
import { Countdown } from './components/Countdown';
import { Memories } from './components/Memories';
import { ClosingMessage } from './components/ClosingMessage';
import { MusicControl } from './components/MusicControl';
import { InvitationNavigation } from './components/InvitationNavigation';
import { MandalaMotif } from './components/OrnamentMotif';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { useAudio } from './hooks/useAudio';

export default function App() {
  const { isPlaying, toggleMusic, startMelody } = useAudio();

  // Initialize scroll reveal triggers
  useIntersectionObserver('.reveal-init', { threshold: 0.15 });

  const handleOpenInvitation = () => {
    // Start ambient background music upon user interaction
    if (!isPlaying) {
      startMelody();
    }

    // Smooth scroll to the Reveal section
    const revealEl = document.getElementById('reveal');
    if (revealEl) {
      revealEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="desktop-wrapper">
      {/* Ambient background motifs for desktop screens */}
      <div className="desktop-ambient-left" aria-hidden="true">
        <MandalaMotif size={200} />
      </div>
      <div className="desktop-ambient-right" aria-hidden="true">
        <MandalaMotif size={200} />
      </div>

      {/* Floating Controls: Music & Chapter Navigation */}
      <div className="fixed-floating-controls">
        <MusicControl isPlaying={isPlaying} onToggle={toggleMusic} />
        <InvitationNavigation />
      </div>

      {/* Mobile-first Invitation Canvas */}
      <main className="invitation-canvas">
        {/* 1. Opening Cover */}
        <Opening onOpenInvitation={handleOpenInvitation} />

        {/* 2. Formal Invitation Reveal */}
        <InvitationReveal />

        {/* 3. Interactive Special Date (3 Heart Locks) */}
        <SpecialDate />

        {/* 4. Progressive Wedding Itinerary Timeline */}
        <WeddingTimeline />

        {/* 5. Destination Palace Venue */}
        <Venue />

        {/* 6. Live Auspicious Countdown */}
        <Countdown />

        {/* 7. Cherished Memories & Swipeable Photo Slider */}
        <Memories />

        {/* 8. Closing Blessing, Couple Signatures & RSVP */}
        <ClosingMessage />
      </main>
    </div>
  );
}
