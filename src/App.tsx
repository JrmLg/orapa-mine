import { QRCodeCanvas } from 'qrcode.react'
import { useEffect, useMemo, useState } from 'react'

function createGameId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

type Phase =
  | 'home'
  | 'create'
  | 'join'
  | 'setup'
  | 'playing'

type Cell = {
  hasGem: boolean
  note: boolean
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('home')
  const [gameId, setGameId] = useState('')
  const [ready, setReady] = useState(false)

  const [board, setBoard] = useState<Cell[]>(
    Array.from({ length: 64 }, () => ({
      hasGem: false,
      note: false
    }))
  )

  const [enemyBoard, setEnemyBoard] = useState<Cell[]>(
    Array.from({ length: 64 }, () => ({
      hasGem: false,
      note: false
    }))
  )

  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const game = params.get('game')

    if (game) {
      setGameId(game.toUpperCase())
      setPhase('join')
    }
  }, [])

  const joinUrl = useMemo(() => {
    if (!gameId) return ''
    return `${window.location.origin}?game=${gameId}`
  }, [gameId])

  function createGame() {
    setGameId(createGameId())
    setPhase('create')
  }

  function joinGame() {
    const id = window.prompt('Code de la partie ?')

    if (!id) return

    setGameId(id.toUpperCase())
    setPhase('join')
  }

  function toggleSetupCell(index: number) {
    setBoard(previous =>
      previous.map((cell, i) =>
        i === index
          ? { ...cell, hasGem: !cell.hasGem }
          : cell
      )
    )
  }

  function toggleNote(index: number) {
    setEnemyBoard(previous =>
      previous.map((cell, i) =>
        i === index
          ? { ...cell, note: !cell.note }
          : cell
      )
    )
  }

  function fireRay(entry: number) {
    setLogs(previous => [
      `Rayon envoyé depuis l'entrée ${entry}`,
      ...previous
    ])
  }

  const gemCount = board.filter(x => x.hasGem).length

  if (phase === 'home') {
    return (
      <main style={{ padding: 24, display: 'grid', gap: 16 }}>
        <h1>Orapa Mine</h1>
        <button onClick={createGame}>Créer une partie</button>
        <button onClick={joinGame}>Rejoindre une partie</button>
      </main>
    )
  }

  if (phase === 'create') {
    return (
      <main style={{ padding: 24, display: 'grid', gap: 16 }}>
        <h1>Partie créée</h1>
        <p>{gameId}</p>
        <QRCodeCanvas value={joinUrl} size={240} />
        <button onClick={() => setPhase('setup')}>
          Commencer
        </button>
      </main>
    )
  }

  if (phase === 'join') {
    return (
      <main style={{ padding: 24, display: 'grid', gap: 16 }}>
        <h1>Partie rejointe</h1>
        <p>{gameId}</p>
        <button onClick={() => setPhase('setup')}>
          Commencer
        </button>
      </main>
    )
  }

  if (phase === 'setup') {
    return (
      <main style={{ padding: 16 }}>
        <h1>Placement des gemmes</h1>

        <p>Gemmes : {gemCount}</p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: 4,
            maxWidth: 480
          }}
        >
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => toggleSetupCell(index)}
              style={{
                aspectRatio: '1'
              }}
            >
              {cell.hasGem ? '💎' : ''}
            </button>
          ))}
        </div>

        <button
          style={{ marginTop: 16 }}
          disabled={gemCount === 0}
          onClick={() => {
            setReady(true)
            setPhase('playing')
          }}
        >
          Valider
        </button>
      </main>
    )
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>Phase de jeu</h1>

      <h2>Plateau adverse</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: 4,
          maxWidth: 480
        }}
      >
        {enemyBoard.map((cell, index) => (
          <button
            key={index}
            onClick={() => toggleNote(index)}
            style={{
              aspectRatio: '1'
            }}
          >
            {cell.note ? '❓' : ''}
          </button>
        ))}
      </div>

      <h2>Entrées de rayon</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: 4,
          maxWidth: 480,
          marginTop: 16
        }}
      >
        {Array.from({ length: 16 }).map((_, index) => (
          <button
            key={index}
            onClick={() => fireRay(index)}
          >
            {index}
          </button>
        ))}
      </div>

      <h2>Journal</h2>

      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </main>
  )
}
