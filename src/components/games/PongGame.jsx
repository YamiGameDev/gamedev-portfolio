// src/components/games/PongGame.jsx
import React, { useState, useEffect, useRef } from 'react';

const PongGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [gameRunning, setGameRunning] = useState(false);
  const gameState = useRef({
    ball: { x: 200, y: 150, dx: 3, dy: 2 },
    playerPaddle: { y: 125 },
    aiPaddle: { y: 125 }
  });

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 300;
  const PADDLE_HEIGHT = 50;
  const PADDLE_WIDTH = 10;

  const resetBall = () => {
    gameState.current.ball = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      dx: Math.random() > 0.5 ? 3 : -3,
      dy: (Math.random() - 0.5) * 4
    };
  };

  const resetGame = () => {
    setScore({ player: 0, ai: 0 });
    resetBall();
    gameState.current.playerPaddle.y = 125;
    gameState.current.aiPaddle.y = 125;
    setGameRunning(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      gameState.current.playerPaddle.y = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, mouseY - PADDLE_HEIGHT / 2));
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!gameRunning) return;

    const gameLoop = setInterval(() => {
      const { ball, playerPaddle, aiPaddle } = gameState.current;

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Ball collision with top/bottom
      if (ball.y <= 0 || ball.y >= CANVAS_HEIGHT) {
        ball.dy = -ball.dy;
      }

      // AI paddle movement
      const aiSpeed = 2;
      if (ball.y < aiPaddle.y + PADDLE_HEIGHT / 2) {
        aiPaddle.y = Math.max(0, aiPaddle.y - aiSpeed);
      } else {
        aiPaddle.y = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, aiPaddle.y + aiSpeed);
      }

      // Ball collision with paddles
      if (ball.x <= PADDLE_WIDTH && ball.y >= playerPaddle.y && ball.y <= playerPaddle.y + PADDLE_HEIGHT) {
        ball.dx = -ball.dx;
        ball.dy += (ball.y - (playerPaddle.y + PADDLE_HEIGHT / 2)) * 0.1;
      }

      if (ball.x >= CANVAS_WIDTH - PADDLE_WIDTH && ball.y >= aiPaddle.y && ball.y <= aiPaddle.y + PADDLE_HEIGHT) {
        ball.dx = -ball.dx;
        ball.dy += (ball.y - (aiPaddle.y + PADDLE_HEIGHT / 2)) * 0.1;
      }

      // Scoring
      if (ball.x < 0) {
        setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
        resetBall();
      } else if (ball.x > CANVAS_WIDTH) {
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
        resetBall();
      }

      // Draw everything
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Clear canvas
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw center line
      ctx.strokeStyle = '#ddd';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(CANVAS_WIDTH / 2, 0);
      ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw paddles
      ctx.fillStyle = '#FF9B17';
      ctx.fillRect(0, playerPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
      ctx.fillRect(CANVAS_WIDTH - PADDLE_WIDTH, aiPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);

      // Draw ball
      ctx.fillStyle = '#FFD63A';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 8, 0, Math.PI * 2);
      ctx.fill();

    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameRunning]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold mb-2" style={{color: '#222831'}}>
          🏓 Pong Game
        </h3>
        <div className="flex justify-center gap-4 text-sm" style={{color: '#666'}}>
          <span>You: {score.player}</span>
          <span>AI: {score.ai}</span>
          {!gameRunning && (
            <button 
              onClick={() => setGameRunning(true)}
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

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-2 border-gray-300 rounded mx-auto block cursor-none"
        style={{ maxWidth: '100%' }}
      />

      <p className="text-center text-xs mt-3" style={{color: '#666'}}>
        Move your mouse to control the left paddle
      </p>

      {score.player >= 5 && (
        <div className="text-center mt-4 p-3 bg-green-50 rounded-lg">
          <h4 className="font-bold text-green-800">🎉 You Win!</h4>
        </div>
      )}

      {score.ai >= 5 && (
        <div className="text-center mt-4 p-3 bg-red-50 rounded-lg">
          <h4 className="font-bold text-red-800">AI Wins!</h4>
        </div>
      )}
    </div>
  );
};

export default PongGame;