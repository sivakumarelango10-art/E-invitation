import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

export function ScratchHeart({ 
  label, 
  value, 
  sublabel,
  isRevealed, 
  onReveal,
  width = 240, 
  height = 205 
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const pointsHistoryRef = useRef([]);
  const [localRevealed, setLocalRevealed] = useState(false);

  // High-performance cell grid for 0ms lag-free percentage tracking
  const gridRows = 10;
  const gridCols = 12;
  const scratchedGridRef = useRef(new Uint8Array(gridRows * gridCols));
  const totalCellsRef = useRef(gridRows * gridCols);

  // Initialize the luxurious gold foil layer
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Rich gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#F5DEB3');
    grad.addColorStop(0.2, '#D4AF37');
    grad.addColorStop(0.45, '#FFF3D6');
    grad.addColorStop(0.7, '#C5A880');
    grad.addColorStop(0.9, '#9E7846');
    grad.addColorStop(1, '#B89360');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Shimmering micro particles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 24; i++) {
      const px = (i * 31) % width;
      const py = (i * 43) % height;
      ctx.beginPath();
      ctx.arc(px, py, (i % 3) + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Gold foil filigree trim
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Calligraphic instruction on the foil
    ctx.fillStyle = '#2A1810';
    ctx.font = '700 11px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '2.5px';
    ctx.fillText('SCRATCH TO REVEAL', width / 2, height / 2 - 14);

    ctx.font = 'italic 16px "Cormorant Garamond", serif';
    ctx.fillStyle = '#4A3328';
    ctx.fillText('✨ touch with love ✨', width / 2, height / 2 + 10);

    // Reset grid
    scratchedGridRef.current.fill(0);
  }, [width, height]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Mark grid cells to calculate reveal percentage with ZERO performance cost
  const markGridCells = (x, y, radius = 24) => {
    const cellW = width / gridCols;
    const cellH = height / gridRows;
    const grid = scratchedGridRef.current;

    const minCol = Math.max(0, Math.floor((x - radius) / cellW));
    const maxCol = Math.min(gridCols - 1, Math.floor((x + radius) / cellW));
    const minRow = Math.max(0, Math.floor((y - radius) / cellH));
    const maxRow = Math.min(gridRows - 1, Math.floor((y + radius) / cellH));

    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        grid[r * gridCols + c] = 1;
      }
    }

    let scratchedCount = 0;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === 1) scratchedCount++;
    }

    const ratio = scratchedCount / totalCellsRef.current;
    if (ratio >= 0.32 && !localRevealed && !isRevealed) {
      setLocalRevealed(true);
      if (onReveal) onReveal();
      try {
        if (navigator.vibrate) navigator.vibrate(25);
      } catch {}
    }
  };

  // Smooth scratch stroke using Bézier curve interpolation
  const eraseAt = (p1, p2) => {
    const canvas = canvasRef.current;
    if (!canvas || localRevealed || isRevealed) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 48; // Generous comfortable eraser brush

    ctx.beginPath();
    if (p1 && p2) {
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      ctx.moveTo(p1.x, p1.y);
      ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
      ctx.stroke();
      markGridCells(midX, midY, 26);
    } else if (p1) {
      ctx.arc(p1.x, p1.y, 24, 0, Math.PI * 2);
      ctx.fill();
      markGridCells(p1.x, p1.y, 24);
    }
    ctx.restore();
  };

  // Convert touch/pointer coordinates accurately relative to canvas
  const getPoint = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  // Native Non-Passive Touch Listeners for iOS and Android
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStartNative = (e) => {
      if (localRevealed || isRevealed) return;
      e.preventDefault(); // Prevent iOS/Android page scroll while scratching
      e.stopPropagation();
      isDrawingRef.current = true;

      const touch = e.touches[0];
      const point = getPoint(touch.clientX, touch.clientY);
      lastPointRef.current = point;
      pointsHistoryRef.current = [point];
      eraseAt(point, null);
    };

    const handleTouchMoveNative = (e) => {
      if (!isDrawingRef.current || localRevealed || isRevealed) return;
      e.preventDefault();
      e.stopPropagation();

      const touch = e.touches[0];
      const currentPoint = getPoint(touch.clientX, touch.clientY);
      const prevPoint = lastPointRef.current || currentPoint;

      eraseAt(prevPoint, currentPoint);
      lastPointRef.current = currentPoint;
    };

    const handleTouchEndNative = (e) => {
      isDrawingRef.current = false;
      lastPointRef.current = null;
      pointsHistoryRef.current = [];
    };

    // Attach native non-passive listeners
    canvas.addEventListener('touchstart', handleTouchStartNative, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMoveNative, { passive: false });
    canvas.addEventListener('touchend', handleTouchEndNative, { passive: false });
    canvas.addEventListener('touchcancel', handleTouchEndNative, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStartNative);
      canvas.removeEventListener('touchmove', handleTouchMoveNative);
      canvas.removeEventListener('touchend', handleTouchEndNative);
      canvas.removeEventListener('touchcancel', handleTouchEndNative);
    };
  }, [localRevealed, isRevealed, onReveal]);

  // Desktop Mouse Handlers
  const handleMouseDown = (e) => {
    if (localRevealed || isRevealed) return;
    isDrawingRef.current = true;
    const point = getPoint(e.clientX, e.clientY);
    lastPointRef.current = point;
    eraseAt(point, null);
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current || localRevealed || isRevealed) return;
    const currentPoint = getPoint(e.clientX, e.clientY);
    const prevPoint = lastPointRef.current || currentPoint;
    eraseAt(prevPoint, currentPoint);
    lastPointRef.current = currentPoint;
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const handleQuickTapReveal = () => {
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
      onClick={handleQuickTapReveal}
    >
      {/* Outer Heart SVG Mask Frame */}
      <div className="scratch-heart-frame">
        {/* Revealed Content Layer (Underneath foil) */}
        <div className="scratch-heart-revealed-content">
          <div className="heart-shimmer-bg" />
          <span className="heart-pill-badge">{label}</span>
          <div className="heart-date-value-wrapper">
            <span className="heart-date-value">{value}</span>
          </div>
          {sublabel && <span className="heart-date-sublabel">{sublabel}</span>}
          {isComplete && (
            <div className="heart-unlocked-sparkle" aria-hidden="true">
              <Sparkles style={{ width: '15px', height: '15px' }} />
            </div>
          )}
        </div>

        {/* Scratchable Gold Foil Canvas */}
        <canvas
          ref={canvasRef}
          className={`scratch-canvas ${isComplete ? 'scratched-away' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            opacity: isComplete ? 0 : 1,
            pointerEvents: isComplete ? 'none' : 'auto'
          }}
          aria-label={`Scratch heart to reveal ${label}`}
        />
      </div>

      {/* Helper Scratch Hint */}
      {!isComplete && (
        <div className="scratch-hint-label">
          <span>✨ Scratch with your finger ✨</span>
        </div>
      )}
    </div>
  );
}
