'use client';

import { useState } from 'react';
import { MINO } from '../components/mino';
import styles from './page.module.css';

const rows = 20;
const cols = 10;

const BOARD = Array(cols * rows).fill(0);

console.log(MINO.I);

export default function Home() {
  const [currentMino, setCurrentMino] = useState<number[][]>(MINO.I);
  const [position, setPosition] = useState({ x: 3, y: 0 });

  const rotateMino = () => {
    const newMino = currentMino.map((_, index) => currentMino.map((row) => row[index]).reverse());
    setCurrentMino(newMino);
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
    return styles.cell;
  };

  const moveBottom = () => {};

  const moveDown = () => {
    setPosition((prev) => ({
      ...prev,
      y: prev.y + 1,
    }));
  };

  const moveRight = () => {
    setPosition((prev) => ({
      ...prev,
      x: prev.x + 1,
    }));
  };

  const moveLeft = () => {
    setPosition((prev) => ({
      ...prev,
      x: prev.x - 1,
    }));
  };

  return (
    <div className={styles.container}>
      <div>
        <button
          style={{
            height: '50px',
            width: '200px',
            fontSize: '30px',
            marginBottom: '10px',
            marginTop: '20px',
          }}
          onClick={rotateMino}
        >
          回るよ
        </button>
      </div>
      <div>
        <button
          style={{
            height: '50px',
            width: '200px',
            fontSize: '30px',
            marginTop: '20px',
          }}
          onClick={moveLeft}
        >
          左です
        </button>
        <button
          style={{
            height: '50px',
            width: '200px',
            fontSize: '30px',
            marginTop: '20px',
          }}
          onClick={moveRight}
        >
          右です
        </button>
      </div>
      <div>
        <button
          style={{
            height: '50px',
            width: '200px',
            fontSize: '30px',
            marginBottom: '10px',
          }}
          onClick={moveDown}
        >
          落ちるよ
        </button>
      </div>
      <div className={styles.board}>
        {BOARD.map((row, index) => (
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
    </div>
  );
}
