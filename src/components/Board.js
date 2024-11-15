const Board = ({ snake, food, boardSize }) => {
  const renderBoard = () => {
    const board = [];
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
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

  return <div className="board">{renderBoard()}</div>;
};

export default Board;
