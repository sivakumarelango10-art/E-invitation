import React, { useState, useRef, useEffect } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralDivider } from './OrnamentMotif';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PhotoViewer } from './PhotoViewer';

export function Memories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const touchStartXRef = useRef(null);
  const isDraggingRef = useRef(false);
  const totalPhotos = weddingConfig.galleryImages.length;

  // Preload all gallery images immediately for instant 0ms switching
  useEffect(() => {
    weddingConfig.galleryImages.forEach((photo) => {
      const img = new Image();
      img.src = photo.url.replace(/\.jpg$/, '.webp');
      const fallback = new Image();
      fallback.src = photo.url;
    });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPhotos);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  // Touch Swipe Handlers (Passive-friendly on slider track)
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  };

  const handleTouchEnd = (e) => {
    if (!isDraggingRef.current || touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartXRef.current = null;
    isDraggingRef.current = false;
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

      {/* High-Performance Sliding Viewport */}
      <div 
        className="memories-slider-wrapper reveal-init stagger-2"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="memories-viewport-frame">
          {/* Continuous GPU-Accelerated Slider Track */}
          <div 
            className="memories-slider-track"
            style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
          >
            {weddingConfig.galleryImages.map((photo, index) => {
              const webpUrl = photo.url.replace(/\.jpg$/, '.webp');

              return (
                <div 
                  key={photo.url}
                  className="memories-slide-item"
                  onClick={() => setLightboxPhoto(photo)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo ${index + 1} of ${totalPhotos}: ${photo.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setLightboxPhoto(photo);
                    }
                  }}
                >
                  <div className="memories-slide-card">
                    <picture>
                      <source srcSet={webpUrl} type="image/webp" />
                      <img 
                        src={photo.url} 
                        alt={photo.title}
                        loading="eager"
                        decoding="async"
                      />
                    </picture>

                    {/* Gradient Overlay with Captions */}
                    <div className="memories-slide-overlay">
                      <span className="memories-tag">{photo.tag}</span>
                      <h3 className="memories-slide-title">{photo.title}</h3>
                      <p className="memories-slide-caption">{photo.caption}</p>
                      
                      <div className="memories-maximize-badge">
                        <Maximize2 style={{ width: '16px', height: '16px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
