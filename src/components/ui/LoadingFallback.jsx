// src/components/ui/LoadingFallback.jsx
import React from 'react';

export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-3 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
  </div>
);

export const ComponentLoader = ({ children }) => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
      <p style={{color: '#666'}}>Loading {children}...</p>
    </div>
  </div>
);

export const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-lg" style={{color: '#666'}}>Loading content...</p>
    </div>
  </div>
);