import { useState } from 'react'
// import './App.css'
import Form from './components/Form'
import Navigation from './components/Navigation'
import styled from 'styled-components'

function App() {
  const [players, setPlayers] = useState([])
  const pages = [
    { title: 'Play', id: 'play' },
    { title: 'History', id: 'history' },
  ]
  const [currentPageId, setCurrentPageId] = useState(pages[0].id)

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
    // console.log(playerWithScore)
  }
  function handleNavigation() {}
}

const PagePlay = styled.div`
  display: grid;
  grid-template-rows: auto min-content;
  height: 100vh;
  gap: 20px;
`

export default App
