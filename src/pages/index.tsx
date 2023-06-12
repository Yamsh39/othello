import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  //checkDirectionではその方向の先にturnColor色の石があるかを探す
  const checkDirection = (x: number, y: number, dx: number, dy: number) => {
    let newX = x + dx;
    let newY = y + dy;
    let count = 0;
    while (board[newY][newX] !== undefined && board[newY][newX] === 3 - turnColor) {
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
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
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
      if (board[y][x] !== 0) {
        break;
      }
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
      // newYについてのみundefinedを確かめるのは、newXがnewYの配列にあるからで
      // newYがそもそもundefinedであれば newXもundefinedになる
    }
    if (validMove) {
      newBoard[y][x] = turnColor;
      setBoard(newBoard);
      setTurnColor(3 - turnColor);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
