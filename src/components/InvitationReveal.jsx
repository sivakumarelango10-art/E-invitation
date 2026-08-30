import React from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { MandalaMotif, FloralDivider } from './OrnamentMotif';

export function InvitationReveal() {
  return (
    <section id="reveal" className="invitation-section reveal-section" aria-label="Formal Wedding Invitation Reveal">
      <div className="paper-texture" />
      
      {/* Top Blessing Lead */}
      <div className="reveal-header reveal-init stagger-1">
        <div style={{ color: 'var(--gold-deep)', display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <MandalaMotif size={32} />
        </div>
        <p className="reveal-intro-text">{weddingConfig.revealHeadline}</p>
        <h2 className="reveal-invitation-lead">{weddingConfig.revealSubheadline}</h2>
      </div>

      {/* Intimate Reveal Portrait */}
      <div className="reveal-portrait-card reveal-init stagger-2">
        <div className="reveal-image-wrapper">
          <img 
            src={weddingConfig.revealImage} 
            alt={`${weddingConfig.brideName} and ${weddingConfig.groomName} in regal wedding attire`}
            loading="lazy"
          />
        </div>
      </div>

      {/* Couple Formal Names with Parentage */}
      <div className="reveal-names-block reveal-init stagger-3">
        <div className="bride-block">
          <h3 className="reveal-name">{weddingConfig.brideFullName}</h3>
          <p className="reveal-parentage">{weddingConfig.brideParents}</p>
        </div>

        <span className="reveal-ampersand-sign">&</span>

        <div className="groom-block">
          <h3 className="reveal-name">{weddingConfig.groomFullName}</h3>
          <p className="reveal-parentage">{weddingConfig.groomParents}</p>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="reveal-init stagger-4" style={{ width: '100%' }}>
        <FloralDivider />
        <p className="reveal-footer-quote">“{weddingConfig.revealFooter}”</p>
      </div>
    </section>
  );
}
