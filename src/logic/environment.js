// Generates a new food position that doesn't overlap with the snake
export const generateNewFood = (snake, boardSize) => {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
};

// Checks if the snake's head is at the food's position
export const isFoodEaten = (head, food) => {
  return head.x === food.x && head.y === food.y;
};
