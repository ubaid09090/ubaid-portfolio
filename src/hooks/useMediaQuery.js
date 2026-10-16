// src/hooks/useMediaQuery.js
import { useState, useEffect } from "react";

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create event listener
    const listener = (event) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener("change", listener);

    // Cleanup
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
};

// Predefined breakpoints
export const useBreakpoints = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const isExtraLargeScreen = useMediaQuery("(min-width: 1536px)");

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    isExtraLargeScreen,
    isSmallScreen: isMobile || isTablet,
    isLargeScreenOrUp: isDesktop || isLargeScreen || isExtraLargeScreen,
  };
};

export default useMediaQuery;
