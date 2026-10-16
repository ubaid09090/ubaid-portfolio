// src/hooks/useIntersectionObserver.js
import { useState, useEffect, useRef } from "react";

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold: 0.1,
        ...options,
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return { ref: elementRef, isIntersecting, entry };
};

// Hook for lazy loading images
export const useLazyLoad = (options = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver(options);

  useEffect(() => {
    if (isIntersecting && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isIntersecting, isLoaded]);

  return { ref, isLoaded, isIntersecting };
};

// Hook for scroll animations
export const useScrollAnimation = (options = {}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver(options);

  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isIntersecting, hasAnimated]);

  return {
    ref,
    isIntersecting,
    hasAnimated,
    shouldAnimate: isIntersecting || hasAnimated,
  };
};

export default useIntersectionObserver;
