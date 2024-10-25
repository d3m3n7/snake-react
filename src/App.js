import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const BOARD_SIZE = 10;  // 10x10 grid

function App() {
  const [snake, setSnake] = useState([{ x: 2, y: 2 }]); // Snake starts at (2,2)
  const [food, setFood] = useState({ x: 5, y: 5 });     // Initial food position
  const [direction, setDirection] = useState({ x: 1, y: 0 }); // Snake moves right
  const [gameOver, setGameOver] = useState(false);

  const boardRef = useRef();

  // Movement logic
  const moveSnake = () => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = { 
      x: (newSnake[0].x + direction.x + BOARD_SIZE) % BOARD_SIZE, 
      y: (newSnake[0].y + direction.y + BOARD_SIZE) % BOARD_SIZE 
    };

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
      newSnake.unshift(head);  // Extend snake by adding head
      generateNewFood();
    } else {
      newSnake.pop(); // Remove tail if no food eaten
      newSnake.unshift(head); // Add new head
    }

    // Check for collisions with itself
    if (newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
    } else {
      setSnake(newSnake);
    }
  };

  // Random food generator
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

  // Keyboard controls for direction
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

  // Move snake every 200ms
  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  });

  // Listen to keyboard events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Render the game board
  const renderBoard = () => {
    const board = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        let className = 'cell';
        if (snake.some(segment => segment.x === x && segment.y === y)) {
          className = 'cell snake';
        } else if (food.x === x && food.y === y) {
          className = 'cell food';
        }
        board.push(<div key={`${x}-${y}`} className={className} />);
      }
    }
    return board;
  };

  return (
    <div className="App">
      <h1>Snake Game</h1>
      {gameOver ? <h2>Game Over</h2> : <div ref={boardRef} className="board">{renderBoard()}</div>}
    </div>
  );
}

export default App;
