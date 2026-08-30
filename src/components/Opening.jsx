import React from 'react';
import { weddingConfig } from '../config/weddingConfig';
import confetti from 'canvas-confetti';

export function Opening({ isOpened, isOpeningAnim, onOpenInvitation }) {
  const handleOpenDoors = () => {
    if (isOpeningAnim || isOpened) return;

    // Trigger golden and marigold petals confetti
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFB703', '#FB8500', '#D4AF37', '#E9D8A6', '#FFFFFF'],
        disableForReducedMotion: true
      });
    } catch {}

    onOpenInvitation();
  };

  return (
    <section id="opening" className="royal-door-section" aria-label="Royal Wedding Palace Door Opening">
      <div className="door-viewport-container">
        {/* Top Marigold Garland Toran */}
        <div className="door-top-garland" aria-hidden="true" />

        {/* 3D Double Palace Doors */}
        <div className={`royal-double-doors ${isOpened || isOpeningAnim ? 'doors-open' : ''}`}>
          {/* Left Door Leaf */}
          <div className="door-leaf door-leaf-left">
            <div className="door-wood-texture" style={{ backgroundImage: `url(${weddingConfig.doorImage})` }} />
            <div className="door-brass-knocker knocker-left" />
            <div className="door-inner-shadow" />
          </div>

          {/* Right Door Leaf */}
          <div className="door-leaf door-leaf-right">
            <div className="door-wood-texture" style={{ backgroundImage: `url(${weddingConfig.doorImage})` }} />
            <div className="door-brass-knocker knocker-right" />
            <div className="door-inner-shadow" />
          </div>
        </div>

        {/* Center Invitation Message & CTA (Fades out when opening) */}
        <div className={`door-center-overlay ${isOpened || isOpeningAnim ? 'overlay-faded' : ''}`}>
          <p className="door-supertitle">{weddingConfig.doorSuperTitle}</p>
          <h1 className="door-headline">{weddingConfig.doorHeadline}</h1>
          <p className="door-subheadline">{weddingConfig.doorSubheadline}</p>

          <button 
            type="button"
            className="btn-door-open touch-press"
            onClick={handleOpenDoors}
            aria-label="Open Invitation Doors"
          >
            <span>{weddingConfig.doorButtonText}</span>
          </button>

          <p className="door-tap-hint">{weddingConfig.doorHintText}</p>
        </div>
      </div>
    </section>
  );
}
