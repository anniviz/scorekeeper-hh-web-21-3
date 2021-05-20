import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Form from './components/Form'
import Navigation from './components/Navigation'
import styled from 'styled-components'
import Header from './components/Header'
import Player from './components/Player'
import Button from './components/Button'
import HistoryEntry from './components/HistoryEntry'

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
        <ActiveGamePage>
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
        </ActiveGamePage>
      )}
      {currentPageId === 'history' && (
        <PagePlay>
          <HistoryContainer>
            {savedGames.map(game => (
              <HistoryEntry
                key={game.id}
                nameOfGame={game.game}
                players={game.players}
              />
            ))}
          </HistoryContainer>
          <Navigation
            onNavigate={handleNavigation}
            pages={pages}
            currentPageId={currentPageId}
          ></Navigation>
        </PagePlay>
      )}
    </>
  )

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

  function createGame(gameObject) {
    const players = gameObject.player.split(',').map(name => name.trim())
    const playerWithScore = players.map(player => ({ name: player, score: 0 }))
    setPlayers(playerWithScore)
    setCurrentGame(gameObject.game)
    setCurrentPageId('game')
  }

  function handleNavigation(id) {
    setCurrentPageId(id)
  }

  function endGame() {
    const currentGameSet = { id: uuidv4(), game: currentGame, players: players }
    setSavedGames(savedGames => [...savedGames, currentGameSet])
    setCurrentPageId('history')
  }

  function loadFromLocal(key) {
    const jsonString = localStorage.getItem(key)
    return JSON.parse(jsonString)
  }

  function saveToLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
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

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  overflow: scroll;
`

const ActiveGamePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
`

export default App
