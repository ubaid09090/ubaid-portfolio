// src/hooks/usePerformance.js
import { useEffect, useState } from 'react';

export const usePerformance = () => {
  const [metrics, setMetrics] = useState({
    fcp: 0,
    lcp: 0,
    cls: 0,
    fid: 0,
    ttfb: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ✅ First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
      }
    });
    observer.observe({ entryTypes: ['paint'] });

    // ✅ Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // ✅ Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let cls = 0;
      list.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      });
      setMetrics(prev => ({ ...prev, cls }));
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // ✅ Time to First Byte
    const ttfbObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const ttfbEntry = entries.find(entry => entry.name === 'navigation');
      if (ttfbEntry) {
        setMetrics(prev => ({ ...prev, ttfb: ttfbEntry.responseStart }));
      }
    });
    ttfbObserver.observe({ entryTypes: ['navigation'] });

    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
      ttfbObserver.disconnect();
    };
  }, []);

  return metrics;
};

// ✅ Check performance score
export const getPerformanceScore = (metrics) => {
  let score = 0;
  if (metrics.fcp < 1800) score += 25;
  if (metrics.lcp < 2500) score += 25;
  if (metrics.cls < 0.1) score += 25;
  if (metrics.ttfb < 800) score += 25;
  return score;
};