import type { GameState } from '../types/game'

export function createGameState(
  gameId: string
): GameState {
  return {
    gameId,
    phase: 'setup',
    currentPlayer: 'player1',
    board: {
      width: 8,
      height: 8,
      gems: []
    }
  }
}
