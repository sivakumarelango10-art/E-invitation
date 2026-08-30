import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { MandalaMotif } from './OrnamentMotif';

const navigationChapters = [
  { id: 'opening', num: '01', title: 'Invitation' },
  { id: 'reveal', num: '02', title: 'The Reveal' },
  { id: 'date', num: '03', title: 'Special Date' },
  { id: 'timeline', num: '04', title: 'Timeline' },
  { id: 'venue', num: '05', title: 'The Venue' },
  { id: 'countdown', num: '06', title: 'Countdown' },
  { id: 'memories', num: '07', title: 'Memories' },
  { id: 'closing', num: '08', title: 'Blessings & RSVP' }
];

export function InvitationNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (targetId) => {
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Menu Button */}
      <button
        type="button"
        className="floating-icon-btn touch-press"
        onClick={() => setIsOpen(true)}
        aria-label="Open Invitation Chapters Menu"
        title="Invitation Chapters"
      >
        <Menu />
      </button>

      {/* Chapters Overlay Modal */}
      {isOpen && (
        <div className="chapter-nav-modal" role="dialog" aria-modal="true" aria-label="Invitation Chapters">
          <div className="chapter-nav-inner">
            <button
              type="button"
              className="chapter-nav-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close Chapters Menu"
            >
              <X />
            </button>

            <div style={{ color: 'var(--gold-primary)', display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <MandalaMotif size={36} />
            </div>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold-deep)' }}>
              Invitation Chapters
            </p>

            <ul className="chapter-nav-list">
              {navigationChapters.map((chapter) => (
                <li key={chapter.id} className="chapter-nav-item">
                  <button
                    type="button"
                    onClick={() => handleNavigate(chapter.id)}
                  >
                    <span className="chapter-nav-num">{chapter.num}</span>
                    <span>{chapter.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
