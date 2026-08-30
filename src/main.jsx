import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Eagerly cache critical images into browser memory
const preloadImages = [
  '/assets/images/royal_doors.webp',
  '/assets/images/temple_backdrop.webp',
  '/assets/images/gallery_sangeet.webp',
  '/assets/images/reveal_couple.webp',
  '/assets/images/gallery_sunset.webp',
  '/assets/images/gallery_haldi.webp',
  '/assets/images/gallery_mandap.webp',
  '/assets/images/venue_palace.webp'
];

preloadImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
