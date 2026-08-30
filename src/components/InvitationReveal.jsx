import React from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { ChevronDown } from 'lucide-react';

export function InvitationReveal() {
  return (
    <section id="reveal" className="sanctum-reveal-section" aria-label="Wedding Couple Reveal">
      {/* Temple Gopuram Backdrop */}
      <div 
        className="sanctum-backdrop-image"
        style={{ backgroundImage: `url(${weddingConfig.revealBackdrop})` }}
      >
        <div className="sanctum-gradient-overlay" />
      </div>

      {/* Floating Typography Content */}
      <div className="sanctum-content-container reveal-init stagger-1">
        <p className="sanctum-supertitle">{weddingConfig.revealSuperTitle}</p>
        <p className="sanctum-tagline">{weddingConfig.revealTagline}</p>

        <div className="sanctum-couple-names">
          <h2 className="sanctum-name">{weddingConfig.brideName}</h2>
          <span className="sanctum-weds-tag">weds</span>
          <h2 className="sanctum-name">{weddingConfig.groomName}</h2>
        </div>

        <p className="sanctum-date-badge">
          {weddingConfig.weddingDay} {weddingConfig.weddingMonth} {weddingConfig.weddingYear}
        </p>

        <div className="sanctum-scroll-hint">
          <span>{weddingConfig.revealFooter}</span>
          <ChevronDown className="sanctum-bounce-arrow" />
        </div>
      </div>
    </section>
  );
}
