// src/components/ui/Typewriter.jsx
import React, { useState, useEffect } from 'react';

const Typewriter = ({ 
  strings, 
  typeSpeed = 40, 
  backSpeed = 50, 
  loop = true,
  delay = 1000 
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout;

    const handleTyping = () => {
      const currentString = strings[currentIndex];
      const shouldDelete = isDeleting;
      const targetText = shouldDelete 
        ? currentString.substring(0, currentText.length - 1)
        : currentString.substring(0, currentText.length + 1);

      setCurrentText(targetText);

      if (!shouldDelete && targetText === currentString) {
        setIsPaused(true);
        timeout = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, delay);
        return;
      }

      if (shouldDelete && targetText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % strings.length);
        timeout = setTimeout(() => {}, 500);
        return;
      }

      const speed = shouldDelete ? backSpeed : typeSpeed;
      timeout = setTimeout(handleTyping, speed);
    };

    if (!isPaused) {
      timeout = setTimeout(handleTyping, 100);
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, isPaused, strings, typeSpeed, backSpeed, delay]);

  return <span>{currentText}</span>;
};

export default Typewriter;