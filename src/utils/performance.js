// src/utils/performance.js

// Image optimization settings
export const IMAGE_CONFIG = {
  quality: 80,
  formats: ['webp', 'jpg'],
  lazy: true,
  blur: true
};

// Animation settings for reduced motion
export const ANIMATION_CONFIG = {
  duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
};

// Debounce utility
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility  
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};