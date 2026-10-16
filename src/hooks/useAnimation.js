// src/hooks/useAnimation.js
import { useState, useEffect, useRef } from "react";

export const useAnimation = (animationClass, trigger = true) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (trigger && !hasAnimated) {
      setIsVisible(true);
      setHasAnimated(true);
    }
  }, [trigger, hasAnimated]);

  useEffect(() => {
    if (!trigger) {
      setIsVisible(false);
    }
  }, [trigger]);

  const animate = (className) => {
    if (elementRef.current) {
      elementRef.current.classList.add(className);
      setTimeout(() => {
        elementRef.current.classList.remove(className);
      }, 1000);
    }
  };

  const triggerAnimation = (className = animationClass) => {
    animate(className);
  };

  return {
    ref: elementRef,
    isVisible,
    hasAnimated,
    triggerAnimation,
    className: isVisible ? animationClass : "",
  };
};

// Fade in animation hook
export const useFadeIn = (delay = 0, trigger = true) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay]);

  return {
    isVisible,
    className: isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8",
    style: {
      transition: `all 0.6s ease-out ${delay}ms`,
    },
  };
};

export default useAnimation;
