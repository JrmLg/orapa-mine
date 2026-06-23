export type PlayerId = 'player1' | 'player2'

export type GamePhase =
  | 'lobby'
  | 'setup'
  | 'playing'
  | 'finished'

export interface Cell {
  x: number
  y: number
}

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
  phase: GamePhase
  currentPlayer: PlayerId
}

export interface RealtimeMessage {
  type: string
  payload?: unknown
}
