import React, { useState, useEffect, useCallback } from 'react';
import Player from './Player';
import Platform from './Platform';
import { checkPlatformCollision } from '../utils/collision';
import { 
  PLATFORMS, 
  GRAVITY, 
  JUMP_FORCE, 
  MOVE_SPEED, 
  PLAYER_WIDTH, 
  PLAYER_HEIGHT,
  TERMINAL_VELOCITY 
} from '../constants/gameConfig';

interface GameState {
  playerX: number;
  playerY: number;
  velocityY: number;
  velocityX: number;
  isJumping: boolean;
  direction: 'left' | 'right';
}

export default function Game() {
  const [gameState, setGameState] = useState<GameState>({
    playerX: 100,
    playerY: 100, // Position initiale plus haute pour que le joueur tombe
    velocityY: 0,
    velocityX: 0,
    isJumping: false,
    direction: 'right',
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.repeat) return;

    setGameState(prev => {
      let newVelocityX = prev.velocityX;
      let newVelocityY = prev.velocityY;
      let newDirection = prev.direction;

      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          newVelocityX = -MOVE_SPEED;
          newDirection = 'left';
          break;
        case 'ArrowRight':
        case 'KeyD':
          newVelocityX = MOVE_SPEED;
          newDirection = 'right';
          break;
        case 'Space':
        case 'ArrowUp':
        case 'KeyW':
          if (!prev.isJumping) {
            newVelocityY = JUMP_FORCE;
          }
          break;
      }

      return {
        ...prev,
        velocityX: newVelocityX,
        velocityY: newVelocityY,
        direction: newDirection,
      };
    });
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowLeft':
      case 'KeyA':
      case 'ArrowRight':
      case 'KeyD':
        setGameState(prev => ({
          ...prev,
          velocityX: 0,
        }));
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    let frameId: number;

    const gameLoop = () => {
      setGameState(prev => {
        const newVelocityY = Math.min(prev.velocityY + GRAVITY, TERMINAL_VELOCITY);
        let newX = prev.playerX + prev.velocityX;
        let newY = prev.playerY + newVelocityY;

        // Limites de l'écran
        newX = Math.max(0, Math.min(960 - PLAYER_WIDTH, newX));
        
        const collision = checkPlatformCollision(
          newX,
          newY,
          PLAYER_WIDTH,
          PLAYER_HEIGHT,
          PLATFORMS
        );

        if (collision.hasCollision) {
          return {
            ...prev,
            playerX: newX,
            playerY: collision.platformY - PLAYER_HEIGHT,
            velocityY: 0,
            isJumping: false,
          };
        }

        return {
          ...prev,
          playerX: newX,
          playerY: newY,
          velocityY: newVelocityY,
          isJumping: true,
        };
      });

      frameId = requestAnimationFrame(gameLoop);
    };

    frameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-400 to-sky-200 overflow-hidden">
      <div className="absolute top-4 right-4 text-white text-sm bg-black/50 px-4 py-2 rounded-lg">
        <p>← → ou A/D pour se déplacer</p>
        <p>Espace ou ↑ pour sauter</p>
      </div>

      <Player
        x={gameState.playerX}
        y={gameState.playerY}
        isJumping={gameState.isJumping}
        direction={gameState.direction}
      />

      {PLATFORMS.map((platform, index) => (
        <Platform
          key={index}
          x={platform.x}
          y={platform.y}
          width={platform.width}
        />
      ))}
    </div>
  );
}