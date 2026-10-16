// src/hooks/useOutsideClick.js
import { useEffect, useRef } from "react";

export const useOutsideClick = (callback, excludeRefs = []) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      // Check if click is outside the ref
      const isOutside = ref.current && !ref.current.contains(event.target);

      // Check if click is on any excluded elements
      const isExcluded = excludeRefs.some(
        (excludeRef) =>
          excludeRef.current && excludeRef.current.contains(event.target),
      );

      if (isOutside && !isExcluded) {
        callback(event);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [callback, excludeRefs]);

  return ref;
};

export default useOutsideClick;
