'use client';

import { MINO } from '../components/mino';
import styles from './page.module.css';

const rows = 20;
const cols = 10;

const BOARD = Array(cols * rows).fill(0);

console.log(MINO.I);

export default function Home() {
  const currentMino = MINO.I;
  const position = { x: 3, y: 0 };
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

  return (
    <div className={styles.container}>
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
