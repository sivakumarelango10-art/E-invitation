import React from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { Bell } from 'lucide-react';

export function WeddingTimeline() {
  return (
    <section id="timeline" className="invitation-section auto-height timeline-ref-section" aria-label="Wedding Timeline">
      <div className="paper-texture" />

      {/* Arched Timeline Card */}
      <div className="timeline-ref-card reveal-init stagger-1">
        {/* Top Gold Bell Ornament */}
        <div className="timeline-top-bell-ornament" aria-hidden="true">
          <div className="bell-hanging-chain" />
          <div className="bell-icon-badge">
            <Bell style={{ width: '16px', height: '16px' }} />
          </div>
        </div>

        <h2 className="timeline-ref-title">{weddingConfig.timelineTitle}</h2>
        <p className="timeline-ref-subtitle">{weddingConfig.timelineSubtitle}</p>

        {/* Vertical Timeline Stream */}
        <div className="timeline-ref-stream">
          <div className="timeline-ref-center-line" />

          {weddingConfig.timelineEvents.map((event, index) => (
            <div key={event.id} className={`timeline-ref-row reveal-init stagger-${index + 2}`}>
              {/* Left Column: Date */}
              <div className="timeline-ref-left-col">
                <span className="timeline-ref-day-num">{event.dateDay}</span>
                <span className="timeline-ref-month-name">{event.dateMonth}</span>
                <span className="timeline-ref-year-num">{event.dateYear}</span>
              </div>

              {/* Center Nodal Marker */}
              <div className="timeline-ref-node-wrapper">
                <div className="timeline-ref-node-dot" />
              </div>

              {/* Right Column: Event Details */}
              <div className="timeline-ref-right-col">
                <h3 className="timeline-ref-event-title">{event.title}</h3>
                <p className="timeline-ref-event-time">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
