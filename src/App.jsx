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

  // Initialize ultra-smooth scroll reveal triggers with reactive state
  useIntersectionObserver('.reveal-init', { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }, [isOpened]);

  const handleOpenDoors = () => {
    setIsOpeningAnim(true);

    // Softly start celebration music upon door touch
    if (!isPlaying) {
      startMelody();
    }

    // Step 1: Doors start opening smoothly, mount downstream chapters
    setTimeout(() => {
      setIsOpened(true);
    }, 500);

    // Step 2: Once door swing is complete, finish animation and cleanup overlay
    setTimeout(() => {
      setIsOpeningAnim(false);
    }, 2200);
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

        {/* 2. Primary Top Screen: Temple Sanctum Reveal with Smooth Bloom */}
        <InvitationReveal 
          isOpened={isOpened}
          isOpeningAnim={isOpeningAnim}
        />

        {/* 3-8. Unfolding Invitation Chapters with Smooth Scrolling */}
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
