import React, { useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { Heart, Send, X, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ClosingMessage() {
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestsCount, setGuestsCount] = useState('2');
  const [guestMessage, setGuestMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitRsvp = (e) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFB703', '#D4AF37', '#FFFFFF', '#A9834F']
      });
    } catch {}

    setTimeout(() => {
      setShowRsvpModal(false);
      setSubmitted(false);
      setGuestName('');
      setGuestMessage('');
    }, 2800);
  };

  return (
    <footer id="closing" className="invitation-section auto-height closing-ref-section" aria-label="Closing Blessing">
      {/* Dark Luxury Arched Card */}
      <div className="closing-ref-card reveal-init stagger-1">
        <p className="closing-ref-supertitle">{weddingConfig.closingSuperTitle}</p>
        <h2 className="closing-ref-salutation">{weddingConfig.closingSalutation}</h2>

        <div className="closing-ref-quote-box">
          <p>{weddingConfig.closingParagraph1}</p>
          <p>{weddingConfig.closingParagraph2}</p>
          <p>{weddingConfig.closingParagraph3}</p>
        </div>

        <div className="closing-ref-signature-block">
          <p className="closing-ref-signoff">{weddingConfig.closingSignOff}</p>
          <h3 className="closing-ref-couple-names">
            {weddingConfig.brideName} & {weddingConfig.groomName}
          </h3>
        </div>

        <div className="closing-ref-bottom-bar">
          <p className="closing-ref-date-tag">{weddingConfig.closingDateFormatted}</p>
          <p className="closing-ref-instagram-tag">{weddingConfig.instagramTag}</p>
        </div>

        {/* RSVP Button */}
        <div style={{ marginTop: '20px' }}>
          <button 
            type="button" 
            className="btn-rsvp-ref touch-press"
            onClick={() => setShowRsvpModal(true)}
            aria-label="Send RSVP"
          >
            <Heart style={{ width: '14px', height: '14px', fill: 'currentColor' }} />
            <span>Send Your Blessings & RSVP</span>
          </button>
        </div>
      </div>

      {/* RSVP Modal */}
      {showRsvpModal && (
        <div className="rsvp-modal-backdrop" role="dialog" aria-modal="true" aria-label="RSVP Form">
          <div className="rsvp-modal-card">
            <button 
              type="button" 
              className="rsvp-modal-close"
              onClick={() => setShowRsvpModal(false)}
              aria-label="Close RSVP form"
            >
              <X />
            </button>

            {submitted ? (
              <div style={{ padding: '20px 0' }}>
                <CheckCircle style={{ width: '48px', height: '48px', color: 'var(--gold-deep)', margin: '0 auto 12px' }} />
                <h3 className="rsvp-modal-title">Thank You, {guestName}!</h3>
                <p className="rsvp-modal-subtitle">Your warm blessings and RSVP have been received with love.</p>
              </div>
            ) : (
              <>
                <h3 className="rsvp-modal-title">Celebrate With Us</h3>
                <p className="rsvp-modal-subtitle">Please let us know if you can grace our special day with your presence.</p>

                <form onSubmit={handleSubmitRsvp} className="rsvp-form">
                  <div className="rsvp-field-group">
                    <label htmlFor="guestName">Your Full Name</label>
                    <input 
                      id="guestName"
                      type="text" 
                      className="rsvp-input" 
                      placeholder="e.g. Rahul & Priya Sharma"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="rsvp-field-group">
                    <label htmlFor="guestsCount">Number of Guests</label>
                    <select 
                      id="guestsCount"
                      className="rsvp-input"
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ Guests (Family)</option>
                    </select>
                  </div>

                  <div className="rsvp-field-group">
                    <label htmlFor="guestMessage">Warm Wishes & Blessings</label>
                    <textarea 
                      id="guestMessage"
                      className="rsvp-input" 
                      rows="3"
                      placeholder="Share a heartfelt note with the couple..."
                      value={guestMessage}
                      onChange={(e) => setGuestMessage(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn-rsvp-submit touch-press">
                    <Send style={{ width: '14px', height: '14px', display: 'inline', marginRight: '6px' }} />
                    <span>Confirm RSVP</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
