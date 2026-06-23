import type { GameState } from './types'

export function createInitialState(): GameState {
  return {
    phase: 'lobby',
    currentPlayer: 'player1'
  }
}
