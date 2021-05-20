import { useState } from 'react'
// import './App.css'
import Form from './components/Form'
import Navigation from './components/Navigation'
import styled from 'styled-components'
import Header from './components/Header'
import Player from './components/Player'
import Button from './components/Button'

function App() {
  const [players, setPlayers] = useState([])
  const pages = [
    { title: 'Play', id: 'play' },
    { title: 'History', id: 'history' },
  ]
  const [currentPageId, setCurrentPageId] = useState(pages[0].id)
  const [currentGame, setCurrentGame] = useState('')
  const [savedGames, setSavedGames] = useState([''])

  return (
    <>
      {currentPageId === 'play' && (
        <PagePlay>
          <Form onSubmit={createGame} />
          <Navigation
            onNavigate={handleNavigation}
            pages={pages}
            currentPageId={currentPageId}
          ></Navigation>
        </PagePlay>
      )}
      {currentPageId === 'game' && (
        <>
          <Header>{currentGame}</Header>
          <PlayerList>
            {players.map((player, index) => (
              <li key={player.name}>
                <Player
                  onMinus={() => updateScore(index, -1)}
                  onPlus={() => updateScore(index, 1)}
                  name={player.name}
                  score={player.score}
                />
              </li>
            ))}
          </PlayerList>
          <Button onClick={resetScores}>Reset scores</Button>
          <Button onClick={endGame}>End game</Button>
        </>
      )}
    </>
  )

  function resetAll() {
    setPlayers([])
  }

  function resetScores() {
    setPlayers(players.map(player => ({ ...player, score: 0 })))
  }

  function updateScore(index, value) {
    const playerToUpdate = players[index]
    setPlayers(players => [
      ...players.slice(0, index),
      { ...playerToUpdate, score: playerToUpdate.score + value },
      ...players.slice(index + 1),
    ])
  }

  function createPlayer(name) {
    setPlayers([...players, { name, score: 0 }])
  }

  function createGame(gameObject) {
    const players = gameObject.player.split(',').map(name => name.trim())
    const playerWithScore = players.map(player => ({ name: player, score: 0 }))
    setPlayers(playerWithScore)
    setCurrentGame(gameObject.game)
    setCurrentPageId('game')
  }

  function handleNavigation() {}

  function endGame() {
    setSavedGames([...savedGames, {}])
    setCurrentPageId('history')
  }
}

const PagePlay = styled.div`
  display: grid;
  grid-template-rows: auto min-content;
  height: 100vh;
  gap: 20px;
`
const PlayerList = styled.ul`
  display: grid;
  align-content: start;
  gap: 10px;
  list-style: none;
  padding: 0;
`

export default App
