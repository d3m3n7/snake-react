import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import GameOver from './components/GameOver';
import { generateNewFood, isFoodEaten } from './logic/environment';
import { moveSnake, hasCollision } from './logic/agent';

const BOARD_SIZE = 10;

function App() {
  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  const updateGameState = () => {
    if (gameOver) return;

    // Move the snake
    const newSnake = moveSnake(snake, direction, BOARD_SIZE);

    // Check for food collision
    if (isFoodEaten(newSnake[0], food)) {
      newSnake.push(snake[snake.length - 1]); // Extend snake
      setFood(generateNewFood(newSnake, BOARD_SIZE)); // Generate new food
    }

    // Check for collisions
    if (hasCollision(newSnake)) {
      setGameOver(true);
    } else {
      setSnake(newSnake);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
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
      default:
        break;
    }
  };

  useEffect(() => {
    const interval = setInterval(updateGameState, 200);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  return (
    <div className="App">
      <h1>Snake Game</h1>
      {gameOver ? <GameOver /> : <Board snake={snake} food={food} boardSize={BOARD_SIZE} />}
    </div>
  );
}

export default App;
