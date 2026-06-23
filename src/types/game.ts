export type PlayerId =
  | 'player1'
  | 'player2'

export type GamePhase =
  | 'lobby'
  | 'setup'
  | 'playing'
  | 'finished'

export interface Gem {
  id: string
  x: number
  y: number
}

export interface BoardState {
  width: number
  height: number
  gems: Gem[]
}

export interface GameState {
  gameId: string
  phase: GamePhase
  currentPlayer: PlayerId
  board: BoardState
}
