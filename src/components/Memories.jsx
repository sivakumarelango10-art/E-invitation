import React, { useState, useRef, useEffect } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PhotoViewer } from './PhotoViewer';

export function Memories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const touchStartXRef = useRef(null);
  const isDraggingRef = useRef(false);
  const totalPhotos = weddingConfig.galleryImages.length;

  useEffect(() => {
    weddingConfig.galleryImages.forEach((photo) => {
      const img = new Image();
      img.src = photo.webp || photo.url;
    });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPhotos);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  };

  const handleTouchEnd = (e) => {
    if (!isDraggingRef.current || touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartXRef.current = null;
    isDraggingRef.current = false;
  };

  return (
    <section id="memories" className="invitation-section auto-height memories-ref-section" aria-label="Our Moments">
      {/* Header */}
      <div className="reveal-init stagger-1">
        <p className="memories-ref-supertitle">{weddingConfig.memoriesSuperTitle}</p>
        <h2 className="memories-ref-title">{weddingConfig.memoriesTitle}</h2>
        <p className="memories-ref-subtitle">{weddingConfig.memoriesSubtitle}</p>
      </div>

      {/* Polaroid Slider Container */}
      <div 
        className="memories-ref-slider-box reveal-init stagger-2"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="polaroid-viewport-frame">
          <div 
            className="polaroid-slider-track"
            style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
          >
            {weddingConfig.galleryImages.map((photo, index) => (
              <div 
                key={photo.url} 
                className="polaroid-slide-item"
                onClick={() => setLightboxPhoto(photo)}
                role="button"
                tabIndex={0}
                aria-label={`Photo ${index + 1}: ${photo.caption}`}
              >
                {/* Physical Polaroid Card */}
                <div className="polaroid-card">
                  <div className="polaroid-image-frame">
                    <picture>
                      <source srcSet={photo.webp} type="image/webp" />
                      <img src={photo.url} alt={photo.caption} loading="eager" decoding="async" />
                    </picture>
                  </div>
                  <p className="polaroid-handwriting-caption">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls Bar (< 01 / 05 >) */}
        <div className="polaroid-controls-bar">
          <button 
            type="button" 
            className="btn-polaroid-arrow touch-press"
            onClick={handlePrev}
            aria-label="Previous Photo"
          >
            <ChevronLeft style={{ width: '16px', height: '16px' }} />
          </button>

          <span className="polaroid-counter-text">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalPhotos).padStart(2, '0')}
          </span>

          <button 
            type="button" 
            className="btn-polaroid-arrow touch-press"
            onClick={handleNext}
            aria-label="Next Photo"
          >
            <ChevronRight style={{ width: '16px', height: '16px' }} />
          </button>
        </div>

        <p className="polaroid-swipe-hint">Swipe left / right - or tap the arrows</p>
      </div>

      {lightboxPhoto && (
        <PhotoViewer 
          photo={lightboxPhoto} 
          onClose={() => setLightboxPhoto(null)} 
        />
      )}
    </section>
  );
}
