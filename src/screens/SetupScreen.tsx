type Props = {
  gameId: string
  goGame: () => void
}

export default function SetupScreen({ gameId, goGame }: Props) {
  return (
    <main style={{ padding: 24 }}>
      <h1>Préparation</h1>
      <p>Partie : {gameId}</p>
      <button onClick={goGame}>Commencer la partie</button>
    </main>
  )
}
