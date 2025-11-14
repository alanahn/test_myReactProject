
import React, { useState, useEffect, useRef, useCallback } from 'react';

// 게임 상태를 나타내는 타입을 정의합니다. 'MENU'는 시작 화면, 'PLAYING'은 게임 중, 'GAME_OVER'는 게임 종료를 의미해요.
type GameState = 'MENU' | 'PLAYING' | 'GAME_OVER';

// 게임 영역의 크기를 상수로 정해두면 나중에 바꾸기 쉬워요.
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 20;
const PLAYER_SPEED = 10;

const SpaceShooterSaga: React.FC = () => {
  // useState를 사용해 게임의 현재 상태를 저장하고 변경할 수 있어요.
  const [gameState, setGameState] = useState<GameState>('MENU');
  // 플레이어의 x 좌표(가로 위치)를 상태로 관리해요.
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  // 어떤 키가 눌렸는지 기록하기 위한 상태. Set을 사용하면 중복 없이 키를 관리할 수 있어요.
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  // requestAnimationFrame을 사용한 게임 루프를 관리하기 위한 useRef.
  // useRef는 리렌더링 되어도 값이 초기화되지 않는 특별한 보관함이에요.
  const gameLoopRef = useRef<number>();

  // 게임 로직을 업데이트하는 함수. 이 함수가 1초에 약 60번씩 계속 실행되면서 게임이 진행돼요.
  // FIX: 플레이어 이동 로직을 하나의 state 업데이트로 통합했습니다.
  // 이전 코드에서는 오른쪽 화살표 키를 눌러도 왼쪽으로 이동하는 버그가 있었고,
  // 양쪽 키를 동시에 눌렀을 때의 움직임이 올바르게 처리되지 않았습니다.
  const update = useCallback(() => {
    setPlayerX((prevX) => {
      let newX = prevX;
      // pressedKeys에 'ArrowLeft'가 있으면 왼쪽으로 이동!
      if (pressedKeys.has('ArrowLeft')) {
        newX -= PLAYER_SPEED;
      }
      // pressedKeys에 'ArrowRight'가 있으면 오른쪽으로 이동!
      if (pressedKeys.has('ArrowRight')) {
        newX += PLAYER_SPEED;
      }
      // Math.max와 Math.min을 사용해 화면 밖으로 나가지 않도록 막아줍니다.
      return Math.max(0, Math.min(GAME_WIDTH - PLAYER_WIDTH, newX));
    });
    
    // 다음 프레임에 또 update 함수를 실행하도록 예약합니다.
    gameLoopRef.current = requestAnimationFrame(update);
  }, [pressedKeys]);


  // useEffect는 특정 상황에 코드를 실행하게 해주는 마법 같은 훅이에요.
  // 여기서는 gameState가 'PLAYING'으로 바뀔 때 딱 한 번 실행됩니다.
  useEffect(() => {
    if (gameState === 'PLAYING') {
      // 키를 눌렀을 때 실행될 함수
      const handleKeyDown = (e: KeyboardEvent) => {
        if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
             setPressedKeys((prev) => new Set(prev).add(e.key));
        }
      };
      // 키에서 손을 뗐을 때 실행될 함수
      const handleKeyUp = (e: KeyboardEvent) => {
        setPressedKeys((prev) => {
          const newKeys = new Set(prev);
          newKeys.delete(e.key);
          return newKeys;
        });
      };

      // 윈도우에 키보드 이벤트 리스너를 추가합니다.
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      
      // 게임 루프를 시작합니다!
      gameLoopRef.current = requestAnimationFrame(update);

      // 이 부분은 아주 중요해요! 컴포넌트가 사라지거나 useEffect가 다시 실행되기 전에
      // 기존의 이벤트 리스너와 게임 루프를 깨끗하게 청소해주는 역할을 합니다.
      // 이렇게 하지 않으면 보이지 않는 유령들이 계속 컴퓨터 자원을 사용하게 될지도 몰라요!
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
        }
      };
    }
  }, [gameState, update]); 

  // 게임을 시작하는 함수
  const startGame = () => {
    setPlayerX(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
    setPressedKeys(new Set());
    setGameState('PLAYING');
  };

  const renderGameContent = () => {
    switch (gameState) {
      case 'MENU':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-blue-900 bg-opacity-70 rounded-lg">
            <h1 className="text-6xl font-bold mb-4 text-yellow-300" style={{ fontFamily: '"Press Start 2P", cursive' }}>
              우주 슈팅 대작전
            </h1>
            <p className="text-xl mb-8 text-white">키보드 화살표로 우주선을 조종하세요!</p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold text-2xl rounded-lg hover:bg-yellow-300 transition-transform transform hover:scale-110"
            >
              게임 시작!
            </button>
          </div>
        );
      case 'PLAYING':
        return (
          <>
            {/* HUD (Heads-Up Display) */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between text-2xl font-bold">
              <div>SCORE: 0</div>
              <div>LIVES: 3</div>
            </div>
            
            {/* Player */}
            <div
              className="absolute bg-yellow-400 rounded-t-lg"
              style={{
                left: `${playerX}px`,
                bottom: '20px',
                width: `${PLAYER_WIDTH}px`,
                height: `${PLAYER_HEIGHT}px`,
                boxShadow: '0 -5px 15px rgba(250, 204, 21, 0.5)',
              }}
            >
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </>
        );
      case 'GAME_OVER':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-red-900 bg-opacity-70 rounded-lg">
             <h1 className="text-6xl font-bold mb-4 text-white">GAME OVER</h1>
             <button
              onClick={startGame}
              className="mt-8 px-8 py-4 bg-gray-200 text-gray-900 font-bold text-2xl rounded-lg hover:bg-white transition-transform transform hover:scale-110"
            >
              다시 도전!
            </button>
          </div>
        )
    }
  };

  return (
    <div className="p-4 bg-black rounded-lg shadow-2xl">
      <div
        className="relative bg-blue-900 overflow-hidden border-4 border-blue-300 rounded-lg"
        style={{ width: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px` }}
      >
        {renderGameContent()}
      </div>
    </div>
  );
};

export default SpaceShooterSaga;
