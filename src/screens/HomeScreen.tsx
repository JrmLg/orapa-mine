import { useNavigate } from 'react-router-dom'

function createGameId() {
  return Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()
}

export default function HomeScreen() {
  const navigate = useNavigate()

  function createGame() {
    const gameId = createGameId()
    navigate(`/setup/${gameId}?host=true`)
  }

  function joinGame() {
    const gameId = prompt('Code de la partie')

    if (!gameId) return

    navigate(`/setup/${gameId.toUpperCase()}`)
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Orapa Mine</h1>

      <button onClick={createGame}>
        Créer une partie
      </button>

      <button onClick={joinGame}>
        Rejoindre une partie
      </button>
    </main>
  )
}
