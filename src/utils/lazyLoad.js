// src/utils/lazyLoad.js
import { lazy } from 'react';

// ✅ Lazy load with prefetch
export const lazyLoad = (importFn, moduleName) => {
  const LazyComponent = lazy(importFn);

  // Prefetch on hover or idle
  if (typeof window !== 'undefined') {
    const prefetch = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => importFn());
      } else {
        setTimeout(() => importFn(), 2000);
      }
    };

    // Prefetch after initial load
    if (document.readyState === 'complete') {
      prefetch();
    } else {
      window.addEventListener('load', prefetch);
    }
  }

  return LazyComponent;
};

// ✅ Prefetch links
export const prefetchRoute = (path) => {
  const links = document.querySelectorAll(`link[rel="prefetch"][href*="${path}"]`);
  if (links.length === 0) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = path;
    document.head.appendChild(link);
  }
};