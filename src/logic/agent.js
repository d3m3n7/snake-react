// Moves the snake and returns the new state
export const moveSnake = (snake, direction, boardSize) => {
  const head = {
    x: (snake[0].x + direction.x + boardSize) % boardSize,
    y: (snake[0].y + direction.y + boardSize) % boardSize,
  };

  return [head, ...snake.slice(0, -1)];
};

// Checks if the snake has collided with itself
export const hasCollision = (snake) => {
  const [head, ...body] = snake;
  return body.some(segment => segment.x === head.x && segment.y === head.y);
};
