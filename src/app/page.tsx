'use client';

import { MINO } from '../components/mino';
import styles from './page.module.css';
const rows = 20,
  cols = 10;

console.log(MINO.O);

export default function Home() {
  return (
    <div className={styles.container}>
      {/* <div className={styles.board} /> */}
      <div className={'mino'}>
        {MINO.I.map((row, y) => (
          <div key={y} style={{ display: 'flex' }}>
            {row.map((cell, x) => {
              if (cell === 1) {
                return <div key={x} className={styles.block} />;
              } else {
                return <div key={x}>a</div>;
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
