import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function MusicControl({ isPlaying, onToggle }) {
  return (
    <button
      type="button"
      className={`floating-icon-btn touch-press ${isPlaying ? 'playing' : ''}`}
      onClick={onToggle}
      aria-label={isPlaying ? "Mute Background Music" : "Play Ambient Wedding Music"}
      title={isPlaying ? "Mute Background Music" : "Play Ambient Wedding Music"}
    >
      {isPlaying ? <Volume2 /> : <VolumeX />}
    </button>
  );
}
