'use client';

import type { Dispatch, SetStateAction } from 'react';
type Props = {
  position: { x: number; y: number };
  setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  currentMino: number[][];
  setCurrentMino: Dispatch<SetStateAction<number[][]>>;
};

export function Manipulate({ position, setPosition, currentMino, setCurrentMino }: Props) {
  const rotateMino = () => {
    const newMino = currentMino.map((_, index) => currentMino.map((row) => row[index]).reverse());
    setCurrentMino(newMino);
  };

  const moveBottom = () => {
    setPosition((prev) => {});
  };

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
    <div>
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
            marginLeft: '100px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={moveDown}
        >
          落ちるよ
        </button>
      </div>
    </div>
  );
}
