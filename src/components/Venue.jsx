import React from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { Navigation } from 'lucide-react';

export function Venue() {
  return (
    <section id="venue" className="invitation-section auto-height venue-ref-section" aria-label="Venue">
      <div className="paper-texture" />

      {/* Arched Venue Card */}
      <div className="venue-ref-card reveal-init stagger-1">
        <span className="venue-ref-badge">{weddingConfig.venueSectionTitle}</span>
        <h2 className="venue-ref-name">{weddingConfig.venueName}</h2>
        <p className="venue-ref-address">{weddingConfig.venueAddress}</p>

        <a 
          href={weddingConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-venue-ref-maps touch-press"
          aria-label="Open in Maps"
        >
          <Navigation style={{ width: '14px', height: '14px' }} />
          <span>OPEN IN MAPS</span>
        </a>
      </div>
    </section>
  );
}
