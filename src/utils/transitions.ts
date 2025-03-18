
import { useEffect, useState, RefObject } from 'react';

// Hook to detect when element is in viewport
export const useInView = (ref: RefObject<HTMLElement>, options = {}, threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, ...options }
    );
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold, options]);
  
  return isInView;
};

// Staggered animation for child elements
export const staggeredAnimation = (delay: number = 0.1) => {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * delay,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };
};

// Animation to reveal text
export const textReveal = {
  hidden: { width: '0%' },
  visible: {
    width: '100%',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Animation for section fade-in
export const sectionFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Animation for cards
export const cardAnimation = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
