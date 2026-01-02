'use client';

import { useState } from 'react';
import { Manipulate } from '../components/manipulate';
import { MINO } from '../components/mino';
import styles from './page.module.css';

const rows = 20;
const cols = 10;

console.log(MINO.I);

export default function Home() {
  const [board, setBoard] = useState<number[]>(Array(cols * rows).fill(0));
  const [currentMino, setCurrentMino] = useState<number[][]>(MINO.I);
  const [position, setPosition] = useState({ x: 3, y: 0 });

  const checkCollision = (mino: number[][], pos: { x: number; y: number }) => {
    for (let y = 0; y < mino.length; y++) {
      for (let x = 0; x < mino[y].length; x++) {
        if (mino[y][x] === 1) {
          const boardX = pos.x + x;
          const boardY = pos.y + y;

          if (boardX < 0 || boardX >= cols || boardY >= rows) {
            return true;
          }

          if (boardY >= 0 && board[boardY * cols + boardX] === 1) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const placeMino = () => {
    const newBoard = [...board];

    currentMino.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          const index = (position.y + y) * cols + (position.x + x);
          if (index >= 0 && index < newBoard.length) {
            newBoard[index] = 1;
          }
        }
      });
    });
    setBoard(newBoard);
    setCurrentMino(MINO.I);
    setPosition({ x: 3, y: 0 });
  };

  const handleMoveLeft = () => {
    const newPos = { ...position, x: position.x - 1 };
    if (!checkCollision(currentMino, newPos)) {
      setPosition(newPos);
    }
  };

  const handleMoveRight = () => {
    const newPos = { ...position, x: position.x + 1 };
    if (!checkCollision(currentMino, newPos)) {
      setPosition(newPos);
    }
  };

  const handleMoveDown = () => {
    const newPos = { ...position, y: position.y + 1 };
    if (checkCollision(currentMino, newPos)) {
      placeMino();
    } else {
      setPosition(newPos);
    }
  };

  const handleRotate = () => {
    const newMino = currentMino.map((_, index) => currentMino.map((row) => row[index]).reverse());
    if (!checkCollision(newMino, position)) {
      setCurrentMino(newMino);
    }
  };

  const getCellClassName = (index: number) => {
    const x = index % cols;
    const y = Math.floor(index / cols);

    const minoY = y - position.y;
    const minoX = x - position.x;

    if (minoY >= 0 && minoY < currentMino.length && minoX >= 0 && minoX < currentMino[0].length) {
      if (currentMino[minoY][minoX] === 1) {
        return styles.block;
      }
    }
    if (board[index] === 1) {
      return styles.block;
    }
    return styles.cell;
  };

  return (
    <div className={styles.container}>
      <Manipulate
        onMoveDown={handleMoveDown}
        onMoveRight={handleMoveRight}
        onMoveLeft={handleMoveLeft}
        onRotate={handleRotate}
      />
      <div className={styles.board}>
        {board.map((row, index) => (
          <div key={index} className={getCellClassName(index)} />
        ))}
      </div>
      <div className={styles.mino}>
        {MINO.I.map((row, y) => (
          <div key={y} style={{ display: 'flex' }}>
            {row.map((cell, x) => {
              if (cell === 1) {
                return <div key={x} className={styles.block} />;
              } else {
                return <div key={x} className={styles.empty} />;
              }
            })}
          </div>
        ))}
      </div>
      <div className={styles.mino}>
        {MINO.T.map((row, y) => (
          <div key={y} style={{ display: 'flex' }}>
            {row.map((cell, x) => {
              if (cell === 1) {
                return <div key={x} className={styles.block} />;
              } else {
                return <div key={x} className={styles.empty} />;
              }
            })}
          </div>
        ))}
      </div>
      <div className={styles.mino}>
        {MINO.N.map((row, y) => (
          <div key={y} style={{ display: 'flex' }}>
            {row.map((cell, x) => {
              if (cell === 1) {
                return <div key={x} className={styles.block} />;
              } else {
                return <div key={x} className={styles.empty} />;
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
