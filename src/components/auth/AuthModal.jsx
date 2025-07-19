// src/components/auth/AuthModal.jsx
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
        
        {mode === 'login' ? (
          <Login onToggleMode={() => setMode('signup')} />
        ) : (
          <Signup onToggleMode={() => setMode('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;