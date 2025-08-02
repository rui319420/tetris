'use client';

import { useState } from 'react';
import styles from './page.module.css';

const rows = 20,
  cols = 10;

const SHAPES = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
};
export default function Home() {
  const [board, setBoard] = useState<number[][]>(() => {
    return Array.from({ length: rows }, () => Array<number>(cols).fill(0));
  });

  const [piece, setPiece] = useState({ x: 3, y: 0, shape: SHAPES.I.shape });
  const newBoard = structuredClone(board);

  const moveBlockRight = () => {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 10; x++) {
        if (newBoard[y][x] === 1 && x !== 9) {
          if (newBoard[y][x] === 1) {
            newBoard[y][x] === 0;
            newBoard[y][x + 1] === 1;
          }
        }
      }
    }
    setBoard(newBoard);
  };

  // const valid = (offsetX: number, offsetY: number) => {};

  // const ticktack = () => {
  //   valid();
  // };

  const valid = () => {};

  return (
    <>
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.board}>
            {board.map((row, y) =>
              row.map((col, x) => {
                // pieceのブロックがこのマスにあるか調べる
                let isPieceBlock = false;
                if (piece) {
                  piece.shape.forEach((pieceRow, py) => {
                    pieceRow.forEach((pieceCell, px) => {
                      if (pieceCell === 1 && y === piece.y + py && x === piece.x + px) {
                        isPieceBlock = true;
                      }
                    });
                  });
                }

                // 積まれたブロックか、pieceのブロックなら表示
                const shouldDisplayBlock = col === 1 || isPieceBlock;

                return (
                  <div className={styles.cell} key={`${x}-${y}`}>
                    {shouldDisplayBlock && <div className={styles.block} />}
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </div>
    </>
  );
}
