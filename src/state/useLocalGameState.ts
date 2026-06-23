import { useState } from 'react'
import { createGameState } from './createGameState'

export function useLocalGameState(
  gameId: string
) {
  return useState(
    () => createGameState(gameId)
  )
}
