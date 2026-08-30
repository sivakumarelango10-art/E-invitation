import React, { useState } from 'react';
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
  const [isOpened, setIsOpened] = useState(false);
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);
  const { isPlaying, toggleMusic, startMelody } = useAudio();

  // Initialize scroll reveal triggers
  useIntersectionObserver('.reveal-init', { threshold: 0.15 });

  const handleOpenDoors = () => {
    setIsOpeningAnim(true);

    // Start ambient background celebration melody
    if (!isPlaying) {
      startMelody();
    }

    // After 3D door swing completes, mark as opened
    setTimeout(() => {
      setIsOpened(true);
      setIsOpeningAnim(false);
    }, 1400);
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
        {isOpened && <InvitationNavigation />}
      </div>

      {/* Mobile-first Invitation Canvas */}
      <main className="invitation-canvas">
        {/* 1. 3D Royal Door Opening Overlay (Sits directly in front of the Sanctum) */}
        <Opening 
          isOpened={isOpened}
          isOpeningAnim={isOpeningAnim}
          onOpenDoors={handleOpenDoors}
        />

        {/* 2. Primary Top Screen: Temple Sanctum Reveal */}
        <InvitationReveal />

        {/* 3-8. Unfolding Invitation Chapters */}
        {(isOpened || isOpeningAnim) && (
          <div className="invitation-story-unfolded">
            {/* 3. Interactive Special Date (3 Scratch Hearts in Triangle Layout) */}
            <SpecialDate />

            {/* 4. Wedding Timeline with Bell Ornament */}
            <WeddingTimeline />

            {/* 5. Venue Destination */}
            <Venue />

            {/* 6. Live Auspicious Countdown */}
            <Countdown />

            {/* 7. Our Moments — Polaroid Memories Slider */}
            <Memories />

            {/* 8. Dear Guest / Final Blessing & RSVP */}
            <ClosingMessage />
          </div>
        )}
      </main>
    </div>
  );
}
