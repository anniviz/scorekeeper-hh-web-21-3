import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import Navigation from './components/Navigation'
import CurrentGamePage from './pages/CurrentGamePage'
import FormPage from './pages/FormPage'
import HistoryPage from './pages/HistoryPage'

function App() {
  const [players, setPlayers] = useState([])
  const pages = [
    { title: 'Play', id: 'play' },
    { title: 'History', id: 'history' },
  ]
  const [currentPageId, setCurrentPageId] = useState(pages[0].id)
  const [currentGame, setCurrentGame] = useState('')
  const [savedGames, setSavedGames] = useState(loadFromLocal('games') ?? [])
  useEffect(() => {
    saveToLocal('games', savedGames)
  }, [savedGames])

  return (
    <PageGrid>
      {currentPageId === 'play' && <FormPage onSubmit={createGame} />}
      {currentPageId === 'game' && (
        <CurrentGamePage
          currentGame={currentGame}
          players={players}
          updateScore={updateScore}
          resetScores={resetScores}
          endGame={endGame}
        />
      )}
      {currentPageId === 'history' && <HistoryPage savedGames={savedGames} />}
      {currentPageId !== 'game' && (
        <Navigation
          onNavigate={setCurrentPageId}
          pages={pages}
          currentPageId={currentPageId}
        ></Navigation>
      )}
    </PageGrid>
  )

  function createGame(gameObject) {
    const players = gameObject.player.split(',').map(name => name.trim())
    const playerWithScore = players.map(player => ({ name: player, score: 0 }))
    setPlayers(playerWithScore)
    setCurrentGame(gameObject.game)
    setCurrentPageId('game')
  }

  function loadFromLocal(key) {
    const jsonString = localStorage.getItem(key)
    return JSON.parse(jsonString)
  }

  function saveToLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  function updateScore(index, value) {
    const playerToUpdate = players[index]
    setPlayers(players => [
      ...players.slice(0, index),
      { ...playerToUpdate, score: playerToUpdate.score + value },
      ...players.slice(index + 1),
    ])
  }

  function resetScores() {
    setPlayers(players.map(player => ({ ...player, score: 0 })))
  }

  function endGame() {
    const currentGameSet = { id: uuidv4(), game: currentGame, players }
    setSavedGames(savedGames => [...savedGames, currentGameSet])
    setCurrentPageId('history')
  }
}

const PageGrid = styled.div`
  display: grid;
  grid-template-rows: auto min-content;
  height: 100vh;
  gap: 20px;
`

export default App
