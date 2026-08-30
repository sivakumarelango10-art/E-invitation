import React from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { ChevronDown } from 'lucide-react';

export function InvitationReveal({ isOpened, isOpeningAnim }) {
  const handleScrollToDate = () => {
    const dateSection = document.getElementById('date');
    if (dateSection) {
      dateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isRevealed = isOpened || isOpeningAnim;

  return (
    <section 
      id="reveal" 
      className={`sanctum-reveal-section ${isRevealed ? 'sanctum-active-reveal' : ''}`} 
      aria-label="Wedding Couple Reveal"
    >
      {/* Temple Gopuram Backdrop with Smooth Bloom */}
      <div 
        className="sanctum-backdrop-image"
        style={{ backgroundImage: `url(${weddingConfig.revealBackdrop})` }}
      >
        <div className="sanctum-gradient-overlay" />
      </div>

      {/* Floating Typography Content */}
      <div className="sanctum-content-container">
        <div className={`sanctum-text-flow ${isRevealed ? 'sanctum-flow-enter' : ''}`}>
          <p className="sanctum-supertitle reveal-init stagger-1">{weddingConfig.revealSuperTitle}</p>
          <p className="sanctum-tagline reveal-init stagger-2">{weddingConfig.revealTagline}</p>

          <div className="sanctum-couple-names reveal-init stagger-3">
            <h2 className="sanctum-name">{weddingConfig.brideName}</h2>
            <span className="sanctum-weds-tag">weds</span>
            <h2 className="sanctum-name">{weddingConfig.groomName}</h2>
          </div>

          <p className="sanctum-date-badge reveal-init stagger-4">
            {weddingConfig.weddingDay} {weddingConfig.weddingMonth} {weddingConfig.weddingYear}
          </p>

          <button 
            type="button"
            className="sanctum-scroll-hint reveal-init stagger-5 touch-press"
            onClick={handleScrollToDate}
            aria-label="Scroll to discover our story"
          >
            <span>{weddingConfig.revealFooter}</span>
            <ChevronDown className="sanctum-bounce-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
