import { useState } from 'react'

type Props = {
  gameId: string
  goGame: () => void
}

export default function SetupScreen({ gameId, goGame }: Props) {
  const [gems, setGems] = useState<number[]>([])

  function toggleGem(index: number) {
    setGems(previous =>
      previous.includes(index)
        ? previous.filter(x => x !== index)
        : [...previous, index]
    )
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>Préparation</h1>
      <p>Partie : {gameId}</p>
      <p>Gemmes placées : {gems.length}</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: 4,
          maxWidth: 480
        }}
      >
        {Array.from({ length: 64 }).map((_, index) => (
          <button
            key={index}
            onClick={() => toggleGem(index)}
            style={{
              aspectRatio: '1',
              fontSize: 22
            }}
          >
            {gems.includes(index) ? '💎' : ''}
          </button>
        ))}
      </div>

      <button
        style={{ marginTop: 16 }}
        disabled={gems.length === 0}
        onClick={goGame}
      >
        Valider mon placement
      </button>
    </main>
  )
}
