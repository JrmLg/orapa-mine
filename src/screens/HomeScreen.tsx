type Props = {
  onCreate: (gameId: string) => void
  onJoin: (gameId: string) => void
}

function createGameId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

export default function HomeScreen({ onCreate, onJoin }: Props) {
  return (
    <main style={{ padding: 24 }}>
      <h1>Orapa Mine</h1>

      <button onClick={() => onCreate(createGameId())}>
        Créer une partie
      </button>

      <button
        onClick={() => {
          const gameId = prompt('Code de la partie')
          if (gameId) onJoin(gameId.toUpperCase())
        }}
      >
        Rejoindre une partie
      </button>
    </main>
  )
}
