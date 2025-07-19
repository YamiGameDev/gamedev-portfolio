// src/App.jsx
import React, { useState, Suspense, lazy } from 'react';
import { ProgressProvider } from './contexts/ProgressContext';
import { AuthProvider } from './contexts/AuthContext';
import { ComponentLoader } from './components/ui/LoadingFallback';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Portfolio from './components/sections/Portfolio';
import Courses from './components/sections/Courses';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import AuthModal from './components/auth/AuthModal';

// Lazy load heavy components
const MiniGames = lazy(() => import('./components/sections/MiniGames'));

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <AuthProvider>
      <ProgressProvider>
        <div className="App">
          <Header onAuthClick={() => setAuthModalOpen(true)} />
          <Hero />
          <About />
          <Portfolio />
          <Courses onAuthRequired={() => setAuthModalOpen(true)} />
          
          <Suspense fallback={<ComponentLoader>Mini Games</ComponentLoader>}>
            <MiniGames />
          </Suspense>
          
          <Skills />
          <Contact />
          
          {authModalOpen && (
            <AuthModal 
              isOpen={authModalOpen} 
              onClose={() => setAuthModalOpen(false)} 
            />
          )}
        </div>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;