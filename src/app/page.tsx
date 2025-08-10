'use client';

// useEffect と useCallback をインポートします
import { useCallback, useEffect, useState } from 'react';
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
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
};

const SHAPE_KEYS = Object.keys(SHAPES);

export default function Home() {
  const [board, setBoard] = useState<number[][]>(() => {
    return Array.from({ length: rows }, () => Array<number>(cols).fill(0));
  });

  const [piece, setPiece] = useState(() => {
    const randomShapeKey = SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)];
    return { x: 3, y: 0, shape: SHAPES[randomShapeKey as keyof typeof SHAPES].shape };
  });

  const [nextPiece, setNextPiece] = useState(() => {
    const randomShapeKey = SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)];
    return { shape: SHAPES[randomShapeKey as keyof typeof SHAPES].shape };
  });

  // 衝突判定: useCallbackで囲む
  const valid = useCallback(
    (newPiece: { x: number; y: number; shape: number[][] }) => {
      for (let y = 0; y < newPiece.shape.length; y++) {
        for (let x = 0; x < newPiece.shape[y].length; x++) {
          if (newPiece.shape[y][x] === 1) {
            const boardX = newPiece.x + x;
            const boardY = newPiece.y + y;
            // 壁との衝突
            if (boardX < 0 || boardX >= cols || boardY >= rows) {
              return false;
            }
            // 他のブロックとの衝突 (boardY < 0 の場合は盤面外なのでチェック不要)
            if (boardY >= 0 && board[boardY][boardX] === 1) {
              return false;
            }
          }
        }
      }
      return true; // どこにもぶつからなかったらtrueを返す
    },
    [board], // boardが変わった時だけ、この関数を再生成する
  );

  // handleKeyDown関数をuseCallbackで囲みます
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      setPiece((prevPiece) => {
        let nextPiece = { ...prevPiece };

        // --- キーの種類によって処理を分岐 ---
        switch (e.key) {
          case 'ArrowLeft':
            nextPiece = { ...prevPiece, x: prevPiece.x - 1 };
            break;

          case 'ArrowRight':
            nextPiece = { ...prevPiece, x: prevPiece.x + 1 };
            break;

          case 'ArrowDown':
            nextPiece = { ...prevPiece, y: prevPiece.y + 1 };
            break;

          case 'ArrowUp': {
            // 回転ロジック
            const rotatedShape = prevPiece.shape[0].map((_, colIndex) =>
              prevPiece.shape.map((row) => row[colIndex]).reverse(),
            );
            nextPiece = { ...prevPiece, shape: rotatedShape };
            break;
          }

          default:
            return prevPiece;
        }

        // --- 移動・回転が可能かチェック ---
        if (valid(nextPiece)) {
          return nextPiece;
        } else {
          return prevPiece;
        }
      });
    },
    [valid], // valid関数に依存させる
  );

  // ↓↓↓ このキーボード操作を登録するuseEffectを新しく追加します ↓↓↓
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // 落下処理
  useEffect(() => {
    const interval = setInterval(() => {
      setPiece((prevPiece) => {
        const nextPiece = { ...prevPiece, y: prevPiece.y + 1 };

        if (valid(nextPiece)) {
          return nextPiece;
        } else {
          // ピースを盤面に固定する
          setBoard((prevBoard) => {
            const newBoard = structuredClone(prevBoard);
            prevPiece.shape.forEach((row, y) => {
              row.forEach((cell, x) => {
                if (cell === 1) {
                  const boardX = prevPiece.x + x;
                  const boardY = prevPiece.y + y;
                  if (boardY >= 0) {
                    newBoard[boardY][boardX] = 1;
                  }
                }
              });
            });

            // ライン消去ロジック
            const boardWithoutClearedLines = newBoard.filter(
              (row) => !row.every((cell) => cell === 1),
            );
            const clearedLinesCount = rows - boardWithoutClearedLines.length;
            for (let i = 0; i < clearedLinesCount; i++) {
              boardWithoutClearedLines.unshift(Array<number>(cols).fill(0));
            }
            return boardWithoutClearedLines;
          });

          // 新しいピースをランダムに生成
          const newNextPieceShapeKey = SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)];
          const newNextPiece = {
            shape: SHAPES[newNextPieceShapeKey as keyof typeof SHAPES].shape,
          };
          setNextPiece(newNextPiece);

          return {
            x: 3,
            y: 0,
            shape: nextPiece.shape, // nextPieceの形を使う
          };
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [valid]); // valid関数を依存配列に追加

  return (
    <>
      <div className={styles.container}>
        {/* gameAreaでメインボードとNEXT表示を囲む */}
        <div className={styles.gameArea}>
          <div className={styles.background}>
            <div className={styles.board}>
              {/* --- ここからがメインボードの描画 --- */}
              {board.map((row, y) =>
                row.map((col, x) => {
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

          {/* --- ここからがNEXTブロックの描画 --- */}
          <div className={styles.nextPieceContainer}>
            <h4>NEXT</h4>
            <div className={styles.nextPieceBoard}>
              {nextPiece &&
                Array.from({ length: 4 }).map((_, y) =>
                  Array.from({ length: 4 }).map((_, x) => {
                    const isPieceBlock = nextPiece.shape.some((row, py) =>
                      row.some((cell, px) => cell === 1 && y === py && x === px),
                    );
                    return (
                      <div className={styles.cell} key={`${x}-${y}`}>
                        {isPieceBlock && <div className={styles.block} />}
                      </div>
                    );
                  }),
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
