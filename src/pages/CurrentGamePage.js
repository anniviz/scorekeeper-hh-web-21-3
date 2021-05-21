import PropTypes from 'prop-types'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import Button from '../components/Button'
import Header from '../components/Header'
import Player from '../components/Player'

CurrentGamePage.propTypes = {
  setPlayers: PropTypes.func.isRequired,
  setSavedGames: PropTypes.func.isRequired,
  setCurrentPageId: PropTypes.func.isRequired,
  currentGame: PropTypes.string,
  players: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, score: PropTypes.number })
  ),
}

export default function CurrentGamePage({
  currentGame,
  players,
  setPlayers,
  setSavedGames,
  setCurrentPageId,
}) {
  return (
    <Flexbox>
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
    </Flexbox>
  )

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

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  overflow: scroll;
`

const PlayerList = styled.ul`
  display: grid;
  align-content: start;
  gap: 10px;
  list-style: none;
  padding: 0;
`
