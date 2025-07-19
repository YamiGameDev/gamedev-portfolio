// src/components/animations/AnimatedComponents.jsx
import React from 'react';
import { useScrollAnimation, useCountUp } from '../../hooks/useScrollAnimation';

export const FadeInUp = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const SlideInLeft = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 -translate-x-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const SlideInRight = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const ScaleIn = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-75'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const CountUpNumber = ({ end, duration, isVisible, suffix = '' }) => {
  const [count, startAnimation] = useCountUp(end, duration);

  React.useEffect(() => {
    if (isVisible) {
      startAnimation();
    }
  }, [isVisible, startAnimation]);

  return <span>{count}{suffix}</span>;
};

export const GlowButton = ({ children, onClick, className = '', style = {} }) => {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden group ${className}`}
      style={{
        background: 'linear-gradient(to right, #FF9B17, #FFD63A)',
        ...style
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transition-transform duration-500"></div>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export const FloatingCard = ({ children, className = '' }) => {
  return (
    <div className={`transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${className}`}>
      {children}
    </div>
  );
};