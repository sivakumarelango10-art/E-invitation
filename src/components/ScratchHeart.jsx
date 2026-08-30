import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

export function ScratchHeart({ 
  label, 
  value, 
  isRevealed, 
  onReveal,
  width = 145, 
  height = 130 
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const [localRevealed, setLocalRevealed] = useState(false);

  // Cell grid for lag-free percentage tracking
  const gridRows = 8;
  const gridCols = 8;
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

    // Warm gold foil gradient matching reference video
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#E6CA85');
    grad.addColorStop(0.3, '#D4AF37');
    grad.addColorStop(0.6, '#F8E9C4');
    grad.addColorStop(0.85, '#C5A880');
    grad.addColorStop(1, '#A9834F');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Shimmering micro sparkles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 14; i++) {
      const px = (i * 23) % width;
      const py = (i * 37) % height;
      ctx.beginPath();
      ctx.arc(px, py, (i % 2) + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Reset grid
    scratchedGridRef.current.fill(0);
  }, [width, height]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const markGridCells = (x, y, radius = 18) => {
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
    if (ratio >= 0.28 && !localRevealed && !isRevealed) {
      setLocalRevealed(true);
      if (onReveal) onReveal();
      try {
        if (navigator.vibrate) navigator.vibrate(20);
      } catch {}
    }
  };

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
    ctx.lineWidth = 36;

    ctx.beginPath();
    if (p1 && p2) {
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      ctx.moveTo(p1.x, p1.y);
      ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
      ctx.stroke();
      markGridCells(midX, midY, 20);
    } else if (p1) {
      ctx.arc(p1.x, p1.y, 18, 0, Math.PI * 2);
      ctx.fill();
      markGridCells(p1.x, p1.y, 18);
    }
    ctx.restore();
  };

  const getPoint = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  // Native non-passive touch listeners for mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStartNative = (e) => {
      if (localRevealed || isRevealed) return;
      e.preventDefault();
      e.stopPropagation();
      isDrawingRef.current = true;

      const touch = e.touches[0];
      const point = getPoint(touch.clientX, touch.clientY);
      lastPointRef.current = point;
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

    const handleTouchEndNative = () => {
      isDrawingRef.current = false;
      lastPointRef.current = null;
    };

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

  const handleQuickTap = () => {
    if (!localRevealed && !isRevealed) {
      setLocalRevealed(true);
      if (onReveal) onReveal();
    }
  };

  const isComplete = localRevealed || isRevealed;

  return (
    <div 
      className={`ref-heart-medallion ${isComplete ? 'is-revealed' : ''}`}
      ref={containerRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={handleQuickTap}
    >
      {/* Outer Heart Shape Frame */}
      <div className="ref-heart-mask-frame">
        {/* Revealed Content (Gold Number / Month / Year) */}
        <div className="ref-heart-revealed-layer">
          <span className="ref-heart-value">{value}</span>
          {isComplete && (
            <div className="ref-heart-sparkle" aria-hidden="true">
              <Sparkles style={{ width: '12px', height: '12px' }} />
            </div>
          )}
        </div>

        {/* Scratchable Gold Canvas */}
        <canvas
          ref={canvasRef}
          className={`ref-scratch-canvas ${isComplete ? 'scratched-away' : ''}`}
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
    </div>
  );
}
