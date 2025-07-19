// src/components/sections/Hero.jsx
import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const texts = [
    "Game Developer",
    "Animation Student",
    "Creative Designer",
    "Problem Solver"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, #222831, #1a1f28, #222831)'}}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{backgroundColor: '#FFD63A', opacity: 0.1}}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{backgroundColor: '#FF9B17', opacity: 0.1, animationDelay: '1000ms'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl animate-ping" style={{backgroundColor: '#FFD63A', opacity: 0.05}}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Greeting */}
          <p className="text-lg md:text-xl mb-4 opacity-90" style={{color: '#FFD63A'}}>
            Hello, I'm
          </p>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Your Next
            <span className="block text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(to right, #FF9B17, #FFD63A)', WebkitBackgroundClip: 'text'}}>
              <span className={`transition-opacity duration-500 ${isTyping ? 'opacity-100' : 'opacity-0'}`}>
                {texts[currentText]}
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting immersive digital experiences through code, creativity, and cutting-edge animation techniques.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="text-white px-8 py-3 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1" style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)', boxShadow: '0 0 0 rgba(255, 155, 23, 0.25)'}}>
              View My Work
            </button>
            <button className="border-2 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105" style={{borderColor: '#FFD63A', color: '#FFD63A'}} onMouseEnter={(e) => {e.target.style.backgroundColor = '#FFD63A'; e.target.style.color = '#222831'}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#FFD63A'}}>
              Download Resume
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 rounded-full animate-float" style={{backgroundColor: '#FFD63A'}}></div>
      <div className="absolute top-1/3 right-16 w-3 h-3 rounded-full animate-float" style={{backgroundColor: '#FF9B17', animationDelay: '500ms'}}></div>
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full animate-float" style={{backgroundColor: '#FFD63A', animationDelay: '1000ms'}}></div>
      <div className="absolute bottom-1/3 right-1/3 w-5 h-5 rounded-full animate-float" style={{backgroundColor: '#FF9B17', animationDelay: '1500ms'}}></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;