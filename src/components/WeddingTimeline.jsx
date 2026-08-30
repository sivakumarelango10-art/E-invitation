import React from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralDivider } from './OrnamentMotif';
import { Clock, MapPin, Sparkles } from 'lucide-react';

export function WeddingTimeline() {
  return (
    <section id="timeline" className="invitation-section auto-height timeline-section" aria-label="Wedding Itinerary Timeline">
      <div className="paper-texture" />
      
      {/* Header */}
      <div className="reveal-init stagger-1">
        <p className="section-supertitle">Celebration Schedule</p>
        <h2 className="section-title">{weddingConfig.timelineTitle}</h2>
        <p className="section-subtitle">{weddingConfig.timelineSubtitle}</p>
        <FloralDivider />
      </div>

      {/* Vertical Progressive Timeline */}
      <div className="timeline-container">
        {/* Animated Connecting Gilded Stem */}
        <div className="timeline-stem-line" />

        {weddingConfig.timelineEvents.map((event, index) => (
          <div 
            key={event.id} 
            className={`timeline-event-item reveal-init stagger-${index + 2}`}
          >
            {/* Nodal checkpoint marker */}
            <div className="timeline-node-marker" aria-hidden="true" />

            {/* Event Card */}
            <div className="timeline-card">
              <div className="timeline-date-row">
                <span className="timeline-badge">{event.dateBadge}</span>
                <span className="timeline-day-name">{event.dayName}</span>
              </div>

              <h3 className="timeline-event-title">{event.title}</h3>

              <div className="timeline-event-time">
                <Clock />
                <span>{event.time}</span>
              </div>

              <div className="timeline-event-venue" style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                <MapPin style={{ width: '13px', height: '13px', color: 'var(--gold-deep)', flexShrink: 0 }} />
                <span>{event.venueNote}</span>
              </div>

              <p style={{ fontSize: '0.76rem', color: 'var(--color-chocolate-muted)', lineHeight: '1.45', marginTop: '4px' }}>
                {event.description}
              </p>

              {event.attire && (
                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--gold-border)', fontSize: '0.7rem', color: 'var(--gold-deep)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles style={{ width: '12px', height: '12px' }} />
                  <span>Attire: {event.attire}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
