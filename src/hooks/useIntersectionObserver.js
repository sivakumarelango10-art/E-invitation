import { useEffect } from 'react';

export function useIntersectionObserver(selector = '.reveal-init', options = { threshold: 0.18 }) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements || elements.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          obs.unobserve(entry.target);
        }
      });
    }, options);

    elements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [selector, options]);
}
