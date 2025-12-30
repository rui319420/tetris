'use client';

import { MINO } from '../components/mino';
import styles from './page.module.css';
const rows = 20,
  cols = 10;

const BOARD = Array(cols * rows).fill(0);

console.log(MINO.O);

export default function Home() {
  return (
    <div className={styles.container}>
      {}
      <div className={styles.board}>
        {BOARD.map((row, index) => (
          <div key={index} className={styles.cell} />
        ))}
      </div>
      <div className={'mino'}>
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
