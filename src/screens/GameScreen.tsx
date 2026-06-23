export default function GameScreen() {
  const cells = Array.from({ length: 64 })

  return (
    <main style={{ padding: 16 }}>
      <h1>Partie</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: 4,
          maxWidth: 480
        }}
      >
        {cells.map((_, index) => (
          <button
            key={index}
            style={{
              aspectRatio: '1',
              fontSize: 20
            }}
          >
            {index}
          </button>
        ))}
      </div>
    </main>
  )
}
