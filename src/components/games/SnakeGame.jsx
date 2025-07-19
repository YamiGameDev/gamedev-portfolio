// src/components/games/SnakeGame.jsx
import React, { useState, useEffect, useCallback } from 'react';

const SnakeGame = () => {
  const GRID_SIZE = 15;
  const INITIAL_SNAKE = [{ x: 7, y: 7 }];
  const INITIAL_FOOD = { x: 10, y: 10 };

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const generateFood = useCallback((snakeBody) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection({ x: 0, y: 0 });
    setGameRunning(false);
    setScore(0);
    setGameOver(false);
  };

  const startGame = () => {
    if (!gameRunning && !gameOver) {
      setDirection({ x: 1, y: 0 });
      setGameRunning(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameRunning) return;
      
      switch(e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameRunning]);

  useEffect(() => {
    if (!gameRunning) return;

    const gameLoop = setInterval(() => {
      setSnake(currentSnake => {
        const newSnake = [...currentSnake];
        const head = { ...newSnake[0] };
        
        head.x += direction.x;
        head.y += direction.y;

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          setGameRunning(false);
          return currentSnake;
        }

        // Check self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          setGameRunning(false);
          return currentSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(gameLoop);
  }, [direction, gameRunning, food, generateFood]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold mb-2" style={{color: '#222831'}}>
          🐍 Snake Game
        </h3>
        <div className="flex justify-center gap-4 text-sm" style={{color: '#666'}}>
          <span>Score: {score}</span>
          {!gameRunning && !gameOver && (
            <button 
              onClick={startGame}
              className="px-3 py-1 rounded text-white text-xs"
              style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
            >
              Start
            </button>
          )}
          <button 
            onClick={resetGame}
            className="px-3 py-1 rounded text-white text-xs"
            style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
          >
            Reset
          </button>
        </div>
      </div>

      <div 
        className="grid mx-auto border-2 border-gray-300 bg-gray-50"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: '300px',
          height: '300px'
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isHead = snake[0]?.x === x && snake[0]?.y === y;
          const isFood = food.x === x && food.y === y;
          
          return (
            <div
              key={index}
              className={`border border-gray-200 ${
                isFood ? 'bg-red-400' : 
                isHead ? 'bg-green-600' :
                isSnake ? 'bg-green-400' : 
                'bg-gray-50'
              }`}
            />
          );
        })}
      </div>

      {!gameRunning && !gameOver && (
        <p className="text-center text-sm mt-3" style={{color: '#666'}}>
          Press Start and use arrow keys to play
        </p>
      )}

      {gameOver && (
        <div className="text-center mt-4 p-4 bg-red-50 rounded-lg">
          <h4 className="font-bold text-red-800">Game Over!</h4>
          <p className="text-red-600 text-sm">Final Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;