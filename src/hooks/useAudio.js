import { useState, useEffect, useRef } from 'react';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const intervalRef = useRef(null);

  // Harmonious Indian Raag Bhoopali / Yaman inspired notes (frequencies in Hz)
  const notes = [
    220.00, // A3
    247.94, // B3
    277.18, // C#4
    329.63, // E4
    369.99, // F#4
    440.00, // A4
    493.88, // B4
    554.37, // C#5
    659.25, // E5
  ];

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
        gainNodeRef.current = audioCtxRef.current.createGain();
        gainNodeRef.current.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);
        gainNodeRef.current.connect(audioCtxRef.current.destination);
      }
    }
  };

  const playPluck = (freq, duration = 2.5) => {
    if (!audioCtxRef.current || !gainNodeRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    // Sitar / acoustic chime tone (warm triangle + slight sine overtone)
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm envelope
    oscGain.gain.setValueAtTime(0.001, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.08);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(oscGain);
    oscGain.connect(gainNodeRef.current);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const startMelody = () => {
    initAudio();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    setIsPlaying(true);

    let step = 0;
    const melodyPattern = [0, 2, 3, 4, 3, 2, 4, 5, 4, 2, 0, 1, 2, 4, 7, 5];

    // Play first immediate chord
    playPluck(notes[0], 4.0);
    playPluck(notes[3], 3.5);

    intervalRef.current = setInterval(() => {
      const noteIdx = melodyPattern[step % melodyPattern.length];
      playPluck(notes[noteIdx], 2.8);

      // Add gentle octave root note every 4 steps
      if (step % 4 === 0) {
        playPluck(notes[0] / 2, 4.5); // Deep warm tanpura root drone
      }

      step++;
    }, 1100);
  };

  const stopMelody = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMelody();
    } else {
      startMelody();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { isPlaying, toggleMusic, startMelody, stopMelody };
}
