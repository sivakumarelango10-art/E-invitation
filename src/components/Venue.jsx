import React, { useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralDivider } from './OrnamentMotif';
import { MapPin, Navigation, Copy, Check } from 'lucide-react';

export function Venue() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const fullText = `${weddingConfig.venueName}, ${weddingConfig.venueAddress}`;
    navigator.clipboard?.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="venue" className="invitation-section auto-height venue-section" aria-label="Wedding Venue & Location">
      <div className="paper-texture" />
      
      {/* Header */}
      <div className="reveal-init stagger-1">
        <p className="section-supertitle">Destination</p>
        <h2 className="section-title">{weddingConfig.venueSectionTitle}</h2>
        <FloralDivider />
      </div>

      {/* Luxury Venue Card */}
      <div className="venue-card-frame reveal-init stagger-2">
        {/* Palace Image */}
        <div className="venue-image-header">
          <img 
            src={weddingConfig.venueImage} 
            alt={weddingConfig.venueName}
            loading="lazy"
          />
        </div>

        {/* Venue Information */}
        <div className="venue-card-body">
          <h3 className="venue-name-display">{weddingConfig.venueName}</h3>
          <p className="venue-subname">{weddingConfig.venueSubName}</p>

          <p className="venue-address-text">
            {weddingConfig.venueAddress}
          </p>

          {/* Action CTAs */}
          <div className="venue-actions-group">
            <a 
              href={weddingConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-open-maps touch-press"
              aria-label="Open location in Google Maps"
            >
              <Navigation />
              <span>Open in Google Maps</span>
            </a>

            <button 
              type="button"
              className="btn-copy-address touch-press"
              onClick={handleCopyAddress}
              aria-label="Copy Venue Address"
            >
              {copied ? (
                <>
                  <Check style={{ width: '14px', height: '14px', color: 'var(--gold-deep)' }} />
                  <span style={{ color: 'var(--gold-deep)', fontWeight: 600 }}>Address Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy style={{ width: '13px', height: '13px' }} />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
