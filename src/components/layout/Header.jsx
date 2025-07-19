// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onAuthClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #FF9B17, #FFD63A)'}}>
              <span className="text-white font-bold text-sm">GD</span>
            </div>
            <span className="text-xl font-bold" style={{color: '#222831'}}>GameDev Portfolio</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            <li><a href="#home" className="hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>Home</a></li>
            <li><a href="#about" className="hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>About</a></li>
            <li><a href="#portfolio" className="hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>Portfolio</a></li>
            <li><a href="#courses" className="hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>Courses</a></li>
            <li><a href="#games" className="hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>Games</a></li>
            <li><a href="#skills" className="hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>Skills</a></li>
            <li><a href="#contact" className="hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>Contact</a></li>
          </ul>

          {/* CTA Button */}
          {/* CTA Button / User Menu */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium" style={{color: '#222831'}}>
                  {user.name}
                </span>
              </div>
              <button 
                onClick={logout}
                className="px-4 py-2 border-2 rounded-full font-medium transition-all duration-300"
                style={{borderColor: '#FFD63A', color: '#FFD63A'}}
                onMouseEnter={(e) => {e.target.style.backgroundColor = '#FFD63A'; e.target.style.color = '#222831'}}
                onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#FFD63A'}}
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={onAuthClick}
              className="hidden md:block text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105" 
              style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
            >
              Login
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col space-y-1 w-6 h-6"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`w-full h-0.5 transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`} style={{backgroundColor: '#222831'}}></span>
            <span className={`w-full h-0.5 transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`} style={{backgroundColor: '#222831'}}></span>
            <span className={`w-full h-0.5 transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`} style={{backgroundColor: '#222831'}}></span>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <ul className="pt-4 pb-2 space-y-2">
            <li><a href="#home" className="block py-2 hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>Home</a></li>
            <li><a href="#about" className="block py-2 hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>About</a></li>
            <li><a href="#portfolio" className="block py-2 hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>Portfolio</a></li>
            <li><a href="#courses" className="block py-2 hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>Courses</a></li>
            <li><a href="#games" className="block py-2 hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>Games</a></li>
            <li><a href="#skills" className="block py-2 hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>Skills</a></li>
            <li><a href="#contact" className="block py-2 hover:transition-colors" style={{color: '#222831'}} onMouseEnter={(e) => e.target.style.color = '#FF9B17'} onMouseLeave={(e) => e.target.style.color = '#222831'}>Contact</a></li>
            <li className="pt-2">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2">
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                    <span className="text-sm" style={{color: '#222831'}}>{user.name}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="w-full py-2 px-4 border-2 rounded-full font-medium"
                    style={{borderColor: '#FFD63A', color: '#FFD63A'}}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onAuthClick}
                  className="w-full text-white px-6 py-2 rounded-full" 
                  style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;