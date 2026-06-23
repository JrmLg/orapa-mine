import { useParams } from 'react-router-dom'

export function useGameId() {
  const { gameId } = useParams()

  if (!gameId) {
    throw new Error('Missing gameId')
  }

  return gameId.toUpperCase()
}
