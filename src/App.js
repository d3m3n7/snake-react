import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Board from './components/Board';
import GameOver from './components/GameOver';

const BOARD_SIZE = 10;

function App() {
  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  const boardRef = useRef();

  const moveSnake = () => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = {
      x: (newSnake[0].x + direction.x + BOARD_SIZE) % BOARD_SIZE,
      y: (newSnake[0].y + direction.y + BOARD_SIZE) % BOARD_SIZE,
    };

    if (head.x === food.x && head.y === food.y) {
      newSnake.unshift(head);
      generateNewFood();
    } else {
      newSnake.pop();
      newSnake.unshift(head);
    }

    if (newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
    } else {
      setSnake(newSnake);
    }
  };

  const generateNewFood = () => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    setFood(newFood);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="App">
      <h1>Snake Game</h1>
      {gameOver ? <GameOver /> : <Board snake={snake} food={food} boardSize={BOARD_SIZE} />}
    </div>
  );
}

export default App;
