import React, { useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralDivider } from './OrnamentMotif';
import { ScratchHeart } from './ScratchHeart';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export function SpecialDate() {
  const [revealed, setRevealed] = useState({
    day: false,
    month: false,
    year: false,
  });

  const handleHeartReveal = (key) => {
    if (revealed[key]) return;

    const nextState = { ...revealed, [key]: true };
    setRevealed(nextState);

    // If this reveal completes all 3 hearts
    if (Object.values(nextState).filter(Boolean).length === 3) {
      setTimeout(() => {
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#C5A880', '#F5ECE0', '#A9834F', '#FFFFFF'],
            disableForReducedMotion: true
          });
        } catch {}
      }, 350);
    }
  };

  const handleRevealAll = () => {
    setRevealed({ day: true, month: true, year: true });
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#C5A880', '#F5ECE0', '#A9834F']
      });
    } catch {}
  };

  const allRevealed = revealed.day && revealed.month && revealed.year;

  return (
    <section id="date" className="invitation-section auto-height special-date-section" aria-label="Interactive Wedding Date Reveal">
      <div className="paper-texture" />
      
      {/* Section Header */}
      <div className="reveal-init stagger-1">
        <p className="section-supertitle">Save The Date</p>
        <h2 className="section-title">{weddingConfig.dateTitle}</h2>
        <p className="section-subtitle">
          Scratch each gold heart to reveal our sacred wedding date
        </p>
        <FloralDivider />
      </div>

      {/* 3 Luxury Scratch Hearts */}
      <div className="scratch-hearts-collection reveal-init stagger-2">
        {/* Heart 1: DAY */}
        <div className="scratch-heart-wrapper">
          <ScratchHeart
            label="THE DAY"
            value={weddingConfig.weddingDay}
            sublabel="Sunday Morning"
            isRevealed={revealed.day}
            onReveal={() => handleHeartReveal('day')}
            width={240}
            height={205}
          />
        </div>

        {/* Connecting Ornamental Divider */}
        <div className="heart-chain-node" aria-hidden="true">
          <Heart style={{ width: '12px', height: '12px', fill: 'currentColor' }} />
        </div>

        {/* Heart 2: MONTH */}
        <div className="scratch-heart-wrapper">
          <ScratchHeart
            label="THE MONTH"
            value={weddingConfig.weddingMonth}
            sublabel="Auspicious Muhurat"
            isRevealed={revealed.month}
            onReveal={() => handleHeartReveal('month')}
            width={240}
            height={205}
          />
        </div>

        {/* Connecting Ornamental Divider */}
        <div className="heart-chain-node" aria-hidden="true">
          <Heart style={{ width: '12px', height: '12px', fill: 'currentColor' }} />
        </div>

        {/* Heart 3: YEAR */}
        <div className="scratch-heart-wrapper">
          <ScratchHeart
            label="THE YEAR"
            value={weddingConfig.weddingYear}
            sublabel="MMXXVI"
            isRevealed={revealed.year}
            onReveal={() => handleHeartReveal('year')}
            width={240}
            height={205}
          />
        </div>
      </div>

      {/* Quick Reveal Helper Button */}
      {!allRevealed && (
        <div className="reveal-all-bar reveal-init stagger-3">
          <button 
            type="button" 
            className="btn-reveal-all touch-press"
            onClick={handleRevealAll}
            aria-label="Reveal all dates at once"
          >
            <Sparkles style={{ width: '13px', height: '13px' }} />
            <span>Scratch All at Once</span>
          </button>
        </div>
      )}

      {/* Romantic Epilogue Toast */}
      {allRevealed && (
        <div className="date-epilogue-toast" role="status" aria-live="polite">
          <p>“{weddingConfig.dateEpilogue}”</p>
        </div>
      )}
    </section>
  );
}
