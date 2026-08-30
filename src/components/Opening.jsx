import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { MandalaMotif, CornerFlourish, FloralDivider } from './OrnamentMotif';
import { ChevronDown, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function Opening({ isOpened, isOpeningAnim, onOpenInvitation }) {
  const [loadStage, setLoadStage] = useState(0);

  useEffect(() => {
    // Choreographed progressive reveal timeline
    const t1 = setTimeout(() => setLoadStage(1), 100);  // Frame & motif
    const t2 = setTimeout(() => setLoadStage(2), 350);  // Arch photo
    const t3 = setTimeout(() => setLoadStage(3), 650);  // Supertitle & tagline
    const t4 = setTimeout(() => setLoadStage(4), 950);  // Couple names
    const t5 = setTimeout(() => setLoadStage(5), 1250); // Invitation message
    const t6 = setTimeout(() => setLoadStage(6), 1550); // CTA Button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  const handleButtonClick = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#C5A880', '#F5ECE0', '#A9834F', '#FFFFFF'],
        disableForReducedMotion: true
      });
    } catch {}
    onOpenInvitation();
  };

  return (
    <section 
      id="opening" 
      className={`invitation-section opening-section ${isOpeningAnim ? 'opening-pulse-active' : ''}`} 
      aria-label="Wedding Invitation Cover"
    >
      <div className="paper-texture" />
      
      {/* Gilded Border Frame */}
      <div 
        className="opening-border-frame" 
        style={{
          opacity: loadStage >= 1 ? 1 : 0,
          transform: loadStage >= 1 ? 'scale(1)' : 'scale(0.96)',
          transition: 'all 1.1s var(--ease-cinematic)'
        }}
      >
        <CornerFlourish position="top-left" className="corner-decor" />
        <CornerFlourish position="top-right" className="corner-decor" />
        <CornerFlourish position="bottom-left" className="corner-decor" />
        <CornerFlourish position="bottom-right" className="corner-decor" />
      </div>

      {/* Top Header Block */}
      <div 
        className="opening-header"
        style={{
          opacity: loadStage >= 3 ? 1 : 0,
          transform: loadStage >= 3 ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 0.9s var(--ease-cinematic)'
        }}
      >
        <div style={{ color: 'var(--gold-primary)', display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <MandalaMotif size={28} />
        </div>
        <p className="opening-supertitle">{weddingConfig.introSuperTitle}</p>
        <p className="opening-tagline">{weddingConfig.introTagline}</p>
      </div>

      {/* Center Arch Photograph */}
      <div 
        className="opening-photo-container"
        style={{
          opacity: loadStage >= 2 ? 1 : 0,
          transform: loadStage >= 2 ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(18px)',
          transition: 'all 1.1s var(--ease-cinematic)'
        }}
      >
        <div className="opening-photo-arch">
          <img 
            src={weddingConfig.heroImage} 
            alt={`${weddingConfig.brideName} and ${weddingConfig.groomName}`} 
            loading="eager"
          />
        </div>
      </div>

      {/* Couple Names & Invitation Message */}
      <div className="opening-bottom-content">
        <div 
          className="opening-couple-names"
          style={{
            opacity: loadStage >= 4 ? 1 : 0,
            transform: loadStage >= 4 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.9s var(--ease-cinematic)'
          }}
        >
          <h1>
            {weddingConfig.brideName}
            <span className="ampersand">&</span>
            {weddingConfig.groomName}
          </h1>
        </div>

        <div 
          style={{
            opacity: loadStage >= 5 ? 1 : 0,
            transform: loadStage >= 5 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.9s var(--ease-cinematic)'
          }}
        >
          <FloralDivider />
          <p className="opening-invitation-msg">{weddingConfig.heroInvitationMessage}</p>
        </div>

        {/* CTA Button */}
        <div 
          style={{
            opacity: loadStage >= 6 ? 1 : 0,
            transform: loadStage >= 6 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.8s var(--ease-cinematic)'
          }}
        >
          {!isOpened ? (
            <button 
              type="button"
              className={`btn-open-invitation touch-press ${isOpeningAnim ? 'anim-seal-glow' : ''}`}
              onClick={handleButtonClick}
              aria-label="Open Wedding Invitation"
            >
              <Sparkles style={{ width: '15px', height: '15px', color: 'var(--gold-vibrant)' }} />
              <span>Open Invitation</span>
              <ChevronDown />
            </button>
          ) : (
            <button 
              type="button"
              className="btn-scroll-continue touch-press"
              onClick={() => {
                const revealEl = document.getElementById('reveal');
                if (revealEl) revealEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Scroll to Explore</span>
              <ChevronDown style={{ width: '14px', height: '14px' }} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
