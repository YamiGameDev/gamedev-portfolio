// src/components/sections/MiniGames.jsx
import React, { useState } from 'react';
import { FadeInUp, ScaleIn } from '../animations/AnimatedComponents';
import MemoryGame from '../games/MemoryGame';
import SnakeGame from '../games/SnakeGame';
import PongGame from '../games/PongGame';

const MiniGames = () => {
  const [activeGame, setActiveGame] = useState('memory');

  const games = [
    { id: 'memory', name: 'Memory Game', icon: '🧠', component: MemoryGame },
    { id: 'snake', name: 'Snake', icon: '🐍', component: SnakeGame },
    { id: 'pong', name: 'Pong', icon: '🏓', component: PongGame }
  ];

  const ActiveGameComponent = games.find(game => game.id === activeGame)?.component;

  return (
    <section id="games" className="py-20" style={{background: 'linear-gradient(to bottom right, #f8f9fa, #fff5e6)'}}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#222831'}}>
                Mini <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(to right, #FF9B17, #FFD63A)', WebkitBackgroundClip: 'text'}}>Games</span>
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{color: '#666'}}>
                Interactive games showcasing programming skills and creativity
              </p>
            </div>
          </FadeInUp>

          {/* Game Selector */}
          <ScaleIn delay={200}>
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-full p-2 shadow-lg">
                {games.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => setActiveGame(game.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 mx-1 transform hover:scale-105 ${
                      activeGame === game.id 
                        ? 'text-white shadow-md scale-105' 
                        : 'hover:bg-gray-50'
                    }`}
                    style={{
                      background: activeGame === game.id 
                        ? 'linear-gradient(to right, #FF9B17, #FFD63A)' 
                        : 'transparent',
                      color: activeGame === game.id ? 'white' : '#222831'
                    }}
                  >
                    <span className="mr-2">{game.icon}</span>
                    {game.name}
                  </button>
                ))}
              </div>
            </div>
          </ScaleIn>

          {/* Game Display */}
          <FadeInUp delay={400}>
            <div className="flex justify-center">
              {ActiveGameComponent && <ActiveGameComponent />}
            </div>
          </FadeInUp>

          {/* Game Info */}
          <FadeInUp delay={600}>
            <div className="mt-8 text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
                <h3 className="text-lg font-bold mb-2" style={{color: '#222831'}}>
                  Built with React & JavaScript
                </h3>
                <p style={{color: '#666'}}>
                  These mini-games demonstrate core programming concepts like state management, 
                  game loops, collision detection, and user interaction - essential skills for game development.
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

export default MiniGames;