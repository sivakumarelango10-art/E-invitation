import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function PhotoViewer({ photo, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  return (
    <div className="photo-lightbox-modal" role="dialog" aria-modal="true" aria-label="Photo Lightbox">
      <button 
        type="button" 
        className="lightbox-close-btn touch-press"
        onClick={onClose}
        aria-label="Close Lightbox"
      >
        <X />
      </button>

      <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-img-wrapper">
          <img src={photo.url} alt={photo.title || "Wedding Memory"} />
        </div>

        <div className="lightbox-caption-meta">
          <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold-vibrant)', marginBottom: '2px' }}>
            {photo.tag}
          </p>
          <h3>{photo.title}</h3>
          <p>{photo.caption}</p>
        </div>
      </div>
    </div>
  );
}
