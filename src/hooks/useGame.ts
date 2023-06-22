import { useState } from 'react';
export const useGame = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const newBoard: number[][] = JSON.parse(JSON.stringify(board));
  const checkDirection = (x: number, y: number, dx: number, dy: number) => {
    let newX = x + dx;
    let newY = y + dy;
    let count = 0;
    while (board[newY] !== undefined && board[newY][newX] === 3 - turnColor) {
      newX += dx;
      newY += dy;
      count++;
    }
    let checker = false;
    if (board[newY] !== undefined && board[newY][newX] === turnColor && count !== 0) {
      checker = true;
    }
    return checker;
  };
  const onClick = (x: number, y: number) => {
    const directions = [
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, -1],
      [1, -1],
    ];
    let validMove = false;
    for (let num = 0; num < 8; num++) {
      const direction = directions[num];
      if (checkDirection(x, y, direction[0], direction[1])) {
        validMove = true;
        let newY = y + direction[1];
        let newX = x + direction[0];
        console.log(y, x);
        while (board[newY] !== undefined && board[newY][newX] === 3 - turnColor) {
          newBoard[newY][newX] = turnColor;
          setBoard(newBoard);
          newY += direction[1];
          newX += direction[0];
        }
      }
    }
    if (validMove) {
      newBoard[y][x] = turnColor;
      setBoard(newBoard);
      setTurnColor(3 - turnColor);
    }
  };
  return { board, onClick };
};
