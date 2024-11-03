interface Platform {
  x: number;
  y: number;
  width: number;
}

interface CollisionResult {
  hasCollision: boolean;
  fromTop: boolean;
  platformY: number;
}

export function checkPlatformCollision(
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
  platforms: Platform[]
): CollisionResult {
  const result: CollisionResult = {
    hasCollision: false,
    fromTop: false,
    platformY: 0,
  };

  for (const platform of platforms) {
    // Vérification de la collision horizontale
    const horizontalCollision =
      playerX + playerWidth > platform.x &&
      playerX < platform.x + platform.width;

    // Vérification de la collision verticale avec plus de précision
    const playerBottom = playerY + playerHeight;
    const platformTop = platform.y;
    
    if (horizontalCollision && 
        playerBottom >= platformTop &&
        playerBottom <= platformTop + 10 &&
        playerY < platformTop) {
      
      result.hasCollision = true;
      result.fromTop = true;
      result.platformY = platform.y;
      break;
    }
  }

  return result;
}