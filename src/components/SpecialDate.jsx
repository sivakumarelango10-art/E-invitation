import React, { useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { ScratchHeart } from './ScratchHeart';
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
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#FFB703', '#FB8500', '#D4AF37', '#E9D8A6', '#FFFFFF'],
            disableForReducedMotion: true
          });
        } catch {}
      }, 300);
    }
  };

  const allRevealed = revealed.day && revealed.month && revealed.year;

  return (
    <section id="date" className="invitation-section auto-height special-date-ref-section" aria-label="Our Special Date">
      <div className="paper-texture" />
      
      {/* Header */}
      <div className="reveal-init stagger-1">
        <h2 className="special-date-ref-title">{weddingConfig.dateTitle}</h2>
        <p className="special-date-ref-subtitle">{weddingConfig.dateSubtitle}</p>
      </div>

      {/* 3 Gold Hearts (2 Top, 1 Bottom Inverted Triangle Layout) */}
      <div className="ref-hearts-triangle-grid reveal-init stagger-2">
        {/* Top Row: DATE & MONTH */}
        <div className="ref-hearts-top-row">
          <div className="ref-heart-col">
            <ScratchHeart
              label="DATE"
              value={weddingConfig.weddingDay}
              isRevealed={revealed.day}
              onReveal={() => handleHeartReveal('day')}
              width={145}
              height={130}
            />
            <span className="ref-heart-bottom-tag">DATE</span>
          </div>

          <div className="ref-heart-col">
            <ScratchHeart
              label="MONTH"
              value={weddingConfig.weddingMonth}
              isRevealed={revealed.month}
              onReveal={() => handleHeartReveal('month')}
              width={145}
              height={130}
            />
            <span className="ref-heart-bottom-tag">MONTH</span>
          </div>
        </div>

        {/* Bottom Center: YEAR */}
        <div className="ref-hearts-bottom-row">
          <div className="ref-heart-col">
            <ScratchHeart
              label="YEAR"
              value={weddingConfig.weddingYear}
              isRevealed={revealed.year}
              onReveal={() => handleHeartReveal('year')}
              width={145}
              height={130}
            />
            <span className="ref-heart-bottom-tag">YEAR</span>
          </div>
        </div>
      </div>

      {/* Subtext Prompt */}
      <div className="reveal-init stagger-3">
        <p className="ref-hearts-hint">{weddingConfig.dateHint}</p>
      </div>

      {/* Romantic Epilogue Toast */}
      {allRevealed && (
        <div className="date-epilogue-toast" role="status" aria-live="polite">
          <p>“{weddingConfig.dateEpilogue}”</p>
        </div>
      )}
    </section>
  );
}
