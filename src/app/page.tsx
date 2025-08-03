'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

const rows = 20,
  cols = 10;

const SHAPES = {
  I: {
    shape: [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1],
    ],
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  L: {
    shape: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
  },
  J: {
    shape: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  N: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
};
export default function Home() {
  const [board, setBoard] = useState<number[][]>(() => {
    return Array.from({ length: rows }, () => Array<number>(cols).fill(0));
  });
  const [piece, setPiece] = useState({ x: 3, y: 0, shape: SHAPES.I.shape });

  const valid = (newPiece: { x: number; y: number; shape: number[][] }) => {
    for (let y = 0; y < newPiece.shape.length; y++) {
      for (let x = 0; x < newPiece.shape[y].length; x++) {
        if (newPiece.shape[y][x] === 1) {
          const boardX = newPiece.x + x;
          const boardY = newPiece.y + y;
          if (boardX < 0 || boardX >= cols || boardY >= rows) {
            return false;
          }
          if (boardX < 0 && board[boardY][boardX] === 1) {
            return false;
          }
        }
      }
    }
    return true; //どこにもぶつからなかったらtrueを返す
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPiece((prevPiece) => {
        const nextPiece = { ...prevPiece, y: prevPiece.y + 1 };

        if (valid(nextPiece)) {
          return nextPiece;
        } else {
          // --- ここからが新しいロジック ---

          // 1. ピースを盤面に固定
          const newBoard = structuredClone(board);
          prevPiece.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
              if (cell === 1) {
                const boardX = prevPiece.x + x;
                const boardY = prevPiece.y + y;
                if (boardY >= 0) {
                  // 盤面内の場合のみ
                  newBoard[boardY][boardX] = 1;
                }
              }
            });
          });
          setBoard(newBoard);

          // 2. 新しいピースを生成して上から出現させる
          return { x: 3, y: 0, shape: SHAPES.O.shape }; // 次はO型のピースを出す例
        }
      });
    }, 500);
    return () => clearInterval(interval);
  }, [valid]); // 依存配列はそのまま

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
