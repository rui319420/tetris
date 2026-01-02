'use client';

type Props = {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
};

export function Manipulate({ onMoveLeft, onMoveRight, onMoveDown, onRotate }: Props) {
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
          onClick={onRotate}
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
          onClick={onMoveLeft}
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
          onClick={onMoveRight}
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
          onClick={onMoveDown}
        >
          落ちるよ
        </button>
      </div>
    </div>
  );
}
