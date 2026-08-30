import { useEffect } from 'react';

export function useIntersectionObserver(selector = '.reveal-init', options = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }, deps = []) {
  useEffect(() => {
    const attachObserver = () => {
      const elements = document.querySelectorAll(selector);
      if (!elements || elements.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      }, options);

      elements.forEach((el) => observer.observe(el));

      return observer;
    };

    const observer = attachObserver();

    // Re-scan when new DOM elements mount (e.g. after doors open)
    const mutationObserver = new MutationObserver(() => {
      if (observer) observer.disconnect();
      attachObserver();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [selector, ...deps]);
}
