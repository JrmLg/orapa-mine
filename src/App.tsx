import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import SetupScreen from './screens/SetupScreen'
import GameScreen from './screens/GameScreen'

export default function App() {
  const [screen, setScreen] = useState<'home' | 'setup' | 'game'>('home')
  const [gameId, setGameId] = useState('TEST01')

  if (screen === 'setup') {
    return <SetupScreen gameId={gameId} goGame={() => setScreen('game')} />
  }

  if (screen === 'game') {
    return <GameScreen />
  }

  return (
    <HomeScreen
      onCreate={(id) => {
        setGameId(id)
        setScreen('setup')
      }}
      onJoin={(id) => {
        setGameId(id)
        setScreen('setup')
      }}
    />
  )
}
