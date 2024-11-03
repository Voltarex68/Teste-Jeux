export const GRAVITY = 0.8;
export const JUMP_FORCE = -15;
export const MOVE_SPEED = 6;
export const PLAYER_WIDTH = 48;
export const PLAYER_HEIGHT = 64;
export const TERMINAL_VELOCITY = 12;

export const PLATFORMS = [
  // Plateforme de départ
  { x: 50, y: 450, width: 250 },
  
  // Parcours principal
  { x: 400, y: 380, width: 150 },
  { x: 650, y: 300, width: 150 },
  { x: 400, y: 220, width: 150 },
  { x: 150, y: 180, width: 150 },
  
  // Sol
  { x: 0, y: 550, width: 1000 },
];