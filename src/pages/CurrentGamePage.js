import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '../components/Button'
import Header from '../components/Header'
import Player from '../components/Player'

CurrentGamePage.propTypes = {
  updateScore: PropTypes.func.isRequired,
  resetScores: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired,
  currentGame: PropTypes.string,
  players: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, score: PropTypes.number })
  ),
}

export default function CurrentGamePage({
  updateScore,
  resetScores,
  endGame,
  currentGame,
  players,
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
