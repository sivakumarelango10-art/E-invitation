import React from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { useCountdown } from '../hooks/useCountdown';
import { FloralDivider } from './OrnamentMotif';

function AnimatedDigit({ value, label }) {
  return (
    <div className="countdown-box">
      <div className="countdown-num-wrapper">
        <span key={value} className="countdown-number" style={{ animation: 'digitSlideIn 0.35s var(--ease-cinematic) forwards' }}>
          {value}
        </span>
      </div>
      <div className="countdown-label">{label}</div>
    </div>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(weddingConfig.weddingDate);

  return (
    <section id="countdown" className="invitation-section auto-height countdown-section" aria-label="Live Wedding Countdown">
      <div className="paper-texture" />
      
      {/* Header */}
      <div className="reveal-init stagger-1">
        <p className="section-supertitle">The Auspicious Moment</p>
        <h2 className="section-title">{weddingConfig.countdownTitle}</h2>
        <p className="section-subtitle">{weddingConfig.countdownSubtitle}</p>
        <FloralDivider />
      </div>

      {/* Countdown Grid (Days, Hours, Minutes, Seconds) */}
      <div className="countdown-grid reveal-init stagger-2">
        <AnimatedDigit value={days} label="Days" />
        <AnimatedDigit value={hours} label="Hours" />
        <AnimatedDigit value={minutes} label="Minutes" />
        <AnimatedDigit value={seconds} label="Seconds" />
      </div>

      {/* Subtext */}
      <div className="reveal-init stagger-3">
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--color-chocolate-muted)' }}>
          {weddingConfig.weddingDayOfWeek}, {weddingConfig.weddingMonth} {weddingConfig.weddingDay}, {weddingConfig.weddingYear}
        </p>
      </div>
    </section>
  );
}
