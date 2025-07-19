// src/components/games/MemoryGame.jsx
import React, { useState, useEffect } from 'react';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const cardSymbols = ['🎮', '🕹️', '👾', '🎯', '🚀', '⭐', '🔥', '💎'];

  const initializeGame = () => {
    const shuffled = [...cardSymbols, ...cardSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, isFlipped: false }));
    
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].symbol === cards[second].symbol) {
        setMatched(prev => [...prev, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched, cards]);

  const handleCardClick = (index) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) {
      return;
    }
    setFlipped(prev => [...prev, index]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2" style={{color: '#222831'}}>
          🧠 Memory Game
        </h3>
        <div className="flex justify-center gap-4 text-sm" style={{color: '#666'}}>
          <span>Moves: {moves}</span>
          <button 
            onClick={initializeGame}
            className="px-3 py-1 rounded text-white text-xs"
            style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`aspect-square flex items-center justify-center text-2xl cursor-pointer rounded-lg transition-all duration-300 ${
              flipped.includes(index) || matched.includes(index)
                ? 'bg-gradient-to-br from-yellow-200 to-orange-200'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {flipped.includes(index) || matched.includes(index) ? card.symbol : '?'}
          </div>
        ))}
      </div>

      {gameWon && (
        <div className="text-center mt-6 p-4 bg-green-50 rounded-lg">
          <h4 className="font-bold text-green-800">🎉 Congratulations!</h4>
          <p className="text-green-600 text-sm">You won in {moves} moves!</p>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;