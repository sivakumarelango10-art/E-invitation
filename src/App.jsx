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

  // Initialize scroll reveal triggers for unveiled elements
  useIntersectionObserver('.reveal-init', { threshold: 0.15 });

  const handleOpenInvitation = () => {
    setIsOpeningAnim(true);

    // Start ambient background music upon intentional interaction
    if (!isPlaying) {
      startMelody();
    }

    // Unfold the remaining invitation chapters with choreographed timing
    setTimeout(() => {
      setIsOpened(true);

      // Smooth scroll to the formal Reveal section
      setTimeout(() => {
        const revealEl = document.getElementById('reveal');
        if (revealEl) {
          revealEl.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpeningAnim(false);
      }, 200);
    }, 450);
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

      {/* Floating Controls: Music & Chapter Navigation (Visible once opened or on top) */}
      <div className={`fixed-floating-controls ${isOpened ? 'controls-visible' : 'controls-hidden'}`}>
        <MusicControl isPlaying={isPlaying} onToggle={toggleMusic} />
        {isOpened && <InvitationNavigation />}
      </div>

      {/* Mobile-first Invitation Canvas */}
      <main className="invitation-canvas">
        {/* 1. Opening Cover Envelope */}
        <Opening 
          isOpened={isOpened}
          isOpeningAnim={isOpeningAnim}
          onOpenInvitation={handleOpenInvitation} 
        />

        {/* 2-8. Unfolding Invitation Chapters (Revealed upon clicking Open Invitation) */}
        {isOpened && (
          <div className="invitation-story-unfolded">
            {/* 2. Formal Invitation Reveal */}
            <InvitationReveal />

            {/* 3. Interactive Special Date (3 Scratch Hearts) */}
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
          </div>
        )}
      </main>
    </div>
  );
}
