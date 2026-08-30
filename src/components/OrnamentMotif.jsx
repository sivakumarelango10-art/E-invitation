import React from 'react';

export function MandalaMotif({ size = 32, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.2" opacity="0.8"/>
      <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="1"/>
      <circle cx="50" cy="50" r="6" fill="currentColor"/>
      
      {/* 8-point Lotus Petals */}
      <path d="M50 12 C44 26 44 34 50 40 C56 34 56 26 50 12Z" fill="currentColor" opacity="0.85"/>
      <path d="M50 88 C44 74 44 66 50 60 C56 66 56 74 50 88Z" fill="currentColor" opacity="0.85"/>
      <path d="M12 50 C26 44 34 44 40 50 C34 56 26 56 12 50Z" fill="currentColor" opacity="0.85"/>
      <path d="M88 50 C74 44 66 44 60 50 C66 56 74 56 88 50Z" fill="currentColor" opacity="0.85"/>
      
      <path d="M23.1 23.1 C33 30 38.6 35.7 42.9 42.9 C35.7 38.6 30 33 23.1 23.1Z" fill="currentColor" opacity="0.7"/>
      <path d="M76.9 76.9 C67 70 61.4 64.3 57.1 57.1 C64.3 61.4 70 67 76.9 76.9Z" fill="currentColor" opacity="0.7"/>
      <path d="M23.1 76.9 C30 67 35.7 61.4 42.9 57.1 C38.6 64.3 33 70 23.1 76.9Z" fill="currentColor" opacity="0.7"/>
      <path d="M76.9 23.1 C70 33 64.3 38.6 57.1 42.9 C61.4 35.7 67 30 76.9 23.1Z" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

export function FloralDivider({ className = '' }) {
  return (
    <div className={`ornament-divider ${className}`} aria-hidden="true">
      <span className="line"></span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" opacity="0.85"/>
      </svg>
      <span className="line"></span>
    </div>
  );
}

export function CornerFlourish({ position = 'top-left', className = '' }) {
  const rotation = {
    'top-left': 'rotate(0deg)',
    'top-right': 'rotate(90deg)',
    'bottom-right': 'rotate(180deg)',
    'bottom-left': 'rotate(270deg)'
  }[position];

  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none" 
      style={{ transform: rotation }}
      className={className}
      aria-hidden="true"
    >
      <path d="M2 38V12C2 6.47715 6.47715 2 12 2H38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M8 38V16C8 11.5817 11.5817 8 16 8H38" stroke="currentColor" strokeWidth="0.8" opacity="0.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
    </svg>
  );
}
