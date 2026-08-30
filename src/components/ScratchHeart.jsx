import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

export function ScratchHeart({ 
  label, 
  value, 
  sublabel,
  isRevealed, 
  onReveal,
  width = 240, 
  height = 210 
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const [percentScratched, setPercentScratched] = useState(0);
  const [localRevealed, setLocalRevealed] = useState(false);

  // SVG Heart Path for clipping and drawing
  const heartPathSvg = "M 120 195 C 114 189 40 128 18 88 C 2 58 12 22 45 12 C 72 4 98 18 120 45 C 142 18 168 4 195 12 C 228 22 238 58 222 88 C 200 128 126 189 120 195 Z";

  // Draw initial gold foil texture on canvas
  const initFoilCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Create luxurious gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#E5C890');
    grad.addColorStop(0.25, '#D4AF37');
    grad.addColorStop(0.5, '#F6E6C2');
    grad.addColorStop(0.75, '#B89360');
    grad.addColorStop(1, '#9C7844');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add subtle brushed foil texture / sparkles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
    for (let i = 0; i < 18; i++) {
      const x = (i * 27) % width;
      const y = (i * 39) % height;
      ctx.beginPath();
      ctx.arc(x, y, (i % 3) + 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add fine filigree border pattern in canvas
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Foil text prompt
    ctx.fillStyle = '#2A1810';
    ctx.font = '600 10px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '2px';
    ctx.fillText('SCRATCH TO REVEAL', width / 2, height / 2 - 12);

    ctx.font = 'italic 16px "Cormorant Garamond", serif';
    ctx.fillStyle = '#4A3328';
    ctx.fillText('✨ with love ✨', width / 2, height / 2 + 10);
  }, [width, height]);

  useEffect(() => {
    initFoilCanvas();
  }, [initFoilCanvas]);

  // Check scratch percentage efficiently
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || localRevealed) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const dpr = window.devicePixelRatio || 1;

    try {
      const sampleStep = 8;
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      let totalSampled = 0;

      for (let y = 0; y < canvas.height; y += sampleStep) {
        for (let x = 0; x < canvas.width; x += sampleStep) {
          const index = (y * canvas.width + x) * 4 + 3; // Alpha channel
          totalSampled++;
          if (data[index] < 128) {
            transparentPixels++;
          }
        }
      }

      const ratio = transparentPixels / totalSampled;
      setPercentScratched(Math.round(ratio * 100));

      // Once 40% scratched, automatically complete the reveal smoothly
      if (ratio >= 0.38) {
        setLocalRevealed(true);
        if (onReveal) onReveal();
        try {
          if (navigator.vibrate) navigator.vibrate(20);
        } catch {}
      }
    } catch {}
  };

  // Pointer event handlers for scratch motion
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const scratchAt = (currentPoint) => {
    const canvas = canvasRef.current;
    if (!canvas || localRevealed) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 36;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
    } else {
      ctx.arc(currentPoint.x, currentPoint.y, 18, 0, Math.PI * 2);
    }
    ctx.stroke();
    ctx.restore();

    lastPointRef.current = currentPoint;
  };

  const handlePointerDown = (e) => {
    if (localRevealed || isRevealed) return;
    isDrawingRef.current = true;
    const point = getCanvasCoords(e);
    scratchAt(point);
    try {
      e.target.setPointerCapture?.(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current || localRevealed || isRevealed) return;
    const point = getCanvasCoords(e);
    scratchAt(point);
    // Throttle check
    if (Math.random() > 0.6) {
      checkScratchPercentage();
    }
  };

  const handlePointerUp = (e) => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  const handleQuickReveal = () => {
    if (!localRevealed && !isRevealed) {
      setLocalRevealed(true);
      if (onReveal) onReveal();
    }
  };

  const isComplete = localRevealed || isRevealed;

  return (
    <div 
      className={`scratch-heart-card ${isComplete ? 'is-revealed' : ''}`}
      ref={containerRef}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Outer Heart Shadow Frame */}
      <div className="scratch-heart-frame">
        {/* Heart Content Layer (Underneath the foil) */}
        <div className="scratch-heart-revealed-content">
          <div className="heart-shimmer-bg" />
          <span className="heart-pill-badge">{label}</span>
          <div className="heart-date-value-wrapper">
            <span className="heart-date-value">{value}</span>
          </div>
          {sublabel && <span className="heart-date-sublabel">{sublabel}</span>}
          {isComplete && (
            <div className="heart-unlocked-sparkle" aria-hidden="true">
              <Sparkles style={{ width: '14px', height: '14px' }} />
            </div>
          )}
        </div>

        {/* Scratchable Canvas Layer (Gold Foil Top) */}
        <canvas
          ref={canvasRef}
          className={`scratch-canvas ${isComplete ? 'scratched-away' : ''}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            opacity: isComplete ? 0 : 1,
            pointerEvents: isComplete ? 'none' : 'auto'
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={handleQuickReveal}
          aria-label={`Scratch heart to reveal ${label}`}
        />
      </div>

      {/* Helper Scratch Hint under the heart */}
      {!isComplete && (
        <div className="scratch-hint-label">
          <span>✨ Scratch with your finger/cursor ✨</span>
        </div>
      )}
    </div>
  );
}
