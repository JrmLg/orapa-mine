import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import SetupScreen from './screens/SetupScreen'
import GameScreen from './screens/GameScreen'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/setup/:gameId" element={<SetupScreen />} />
        <Route path="/game/:gameId" element={<GameScreen />} />
      </Routes>
    </BrowserRouter>
  )
}
