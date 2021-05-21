import styled from 'styled-components'
import PropTypes from 'prop-types'
import HistoryEntry from '../components/HistoryEntry'

HistoryPage.propTypes = {
  savedGames: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      game: PropTypes.string,
      players: PropTypes.arrayOf(
        PropTypes.shape({ name: PropTypes.string, score: PropTypes.number })
      ),
    })
  ),
}

export default function HistoryPage({ savedGames }) {
  return (
    <HistoryContainer>
      {savedGames.map(({ id, game, players }) => (
        <HistoryEntry key={id} nameOfGame={game} players={players} />
      ))}
    </HistoryContainer>
  )
}

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  overflow: scroll;
`
