import React from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { useCountdown } from '../hooks/useCountdown';

function RefCountdownBox({ value, label }) {
  return (
    <div className="ref-countdown-box">
      <span className="ref-countdown-digit">{value}</span>
      <span className="ref-countdown-label">{label}</span>
    </div>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(weddingConfig.weddingDate);

  return (
    <section id="countdown" className="invitation-section auto-height countdown-ref-section" aria-label="Countdown">
      {/* Dark Luxury Countdown Card */}
      <div className="countdown-ref-card reveal-init stagger-1">
        <p className="countdown-ref-supertitle">{weddingConfig.countdownSuperTitle}</p>
        <h2 className="countdown-ref-title">{weddingConfig.countdownTitle}</h2>
        <p className="countdown-ref-subtitle">{weddingConfig.countdownSubtitle}</p>

        {/* 2x2 Grid of Countdown Digits */}
        <div className="ref-countdown-grid">
          <RefCountdownBox value={days} label="DAYS" />
          <RefCountdownBox value={hours} label="HOURS" />
          <RefCountdownBox value={minutes} label="MINUTES" />
          <RefCountdownBox value={seconds} label="SECONDS" />
        </div>

        <p className="countdown-ref-footer-date">{weddingConfig.countdownDateLabel}</p>
      </div>
    </section>
  );
}
