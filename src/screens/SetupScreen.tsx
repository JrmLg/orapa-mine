import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCodePanel from '../components/QRCodePanel'
import { useGameId } from '../hooks/useGameId'
import { connectGame } from '../realtime/connectGame'
import { registerListeners } from '../realtime/registerListeners'
import { sendMessage } from '../realtime/sendMessage'

export default function SetupScreen() {
  const gameId = useGameId()
  const navigate = useNavigate()

  const [channel, setChannel] = useState<any>(null)
  const [connected, setConnected] = useState(false)
  const [remoteReady, setRemoteReady] = useState(false)
  const [localReady, setLocalReady] = useState(false)

  const joinUrl = useMemo(
    () => `${window.location.origin}/setup/${gameId}`,
    [gameId]
  )

  useEffect(() => {
    async function run() {
      const c = await connectGame(gameId)

      registerListeners(c, payload => {
        const realtimePayload = payload as {
          event?: string
        }

        const event = realtimePayload.event

        if (event === 'player_joined') {
          setConnected(true)
        }

        if (event === 'setup_ready') {
          setRemoteReady(true)
        }
      })

      setChannel(c)

      await sendMessage(c, {
        type: 'player_joined',
        playerId: crypto.randomUUID()
      })
    }

    run()
  }, [gameId])

  useEffect(() => {
    if (localReady && remoteReady) {
      navigate(`/game/${gameId}`)
    }
  }, [localReady, remoteReady, navigate, gameId])

  async function ready() {
    setLocalReady(true)

    if (!channel) return

    await sendMessage(channel, {
      type: 'setup_ready',
      playerId: crypto.randomUUID()
    })
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Préparation</h1>

      <p>Partie : {gameId}</p>

      <QRCodePanel value={joinUrl} />

      <p>
        Adversaire :
        {' '}
        {connected ? 'Connecté' : 'En attente'}
      </p>

      <p>
        Prêt :
        {' '}
        {localReady ? 'Oui' : 'Non'}
      </p>

      <button onClick={ready}>
        Je suis prêt
      </button>
    </main>
  )
}
