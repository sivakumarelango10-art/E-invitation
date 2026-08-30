import React, { useState, useRef } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralDivider } from './OrnamentMotif';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PhotoViewer } from './PhotoViewer';

export function Memories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const totalPhotos = weddingConfig.galleryImages.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPhotos);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Minimum swipe threshold 40px
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  const activePhoto = weddingConfig.galleryImages[currentIndex];

  return (
    <section id="memories" className="invitation-section auto-height memories-section" aria-label="Wedding Memories & Gallery">
      <div className="paper-texture" />
      
      {/* Header */}
      <div className="reveal-init stagger-1">
        <p className="section-supertitle">Cherished Moments</p>
        <h2 className="section-title">{weddingConfig.memoriesTitle}</h2>
        <p className="section-subtitle">{weddingConfig.memoriesSubtitle}</p>
        <FloralDivider />
      </div>

      {/* Swipeable Photo Container */}
      <div 
        className="memories-slider-wrapper reveal-init stagger-2"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="memories-slide-card"
          onClick={() => setLightboxPhoto(activePhoto)}
          role="button"
          tabIndex={0}
          aria-label={`View photo ${currentIndex + 1} of ${totalPhotos}: ${activePhoto.title}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setLightboxPhoto(activePhoto);
            }
          }}
        >
          <img 
            key={activePhoto.url}
            src={activePhoto.url} 
            alt={activePhoto.title}
            style={{ animation: 'photoSettle 0.8s var(--ease-cinematic) forwards' }}
            loading="lazy"
          />

          {/* Gradient Overlay with Captions */}
          <div className="memories-slide-overlay">
            <span className="memories-tag">{activePhoto.tag}</span>
            <h3 className="memories-slide-title">{activePhoto.title}</h3>
            <p className="memories-slide-caption">{activePhoto.caption}</p>
            
            <div style={{ position: 'absolute', top: '16px', right: '16px', color: 'rgba(255,255,255,0.7)' }}>
              <Maximize2 style={{ width: '18px', height: '18px' }} />
            </div>
          </div>
        </div>

        {/* Slider Controls Bar */}
        <div className="memories-controls-bar">
          <div className="memories-counter">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalPhotos).padStart(2, '0')}
          </div>

          <div className="slider-nav-btns">
            <button 
              type="button" 
              className="btn-slider-arrow touch-press"
              onClick={handlePrev}
              aria-label="Previous Photo"
            >
              <ChevronLeft />
            </button>
            <button 
              type="button" 
              className="btn-slider-arrow touch-press"
              onClick={handleNext}
              aria-label="Next Photo"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <PhotoViewer 
          photo={lightboxPhoto} 
          onClose={() => setLightboxPhoto(null)} 
        />
      )}
    </section>
  );
}
