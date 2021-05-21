import PropTypes from 'prop-types'
import styled from 'styled-components'
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
    <Flexbox>
      {savedGames.map(({ id, game, players }) => (
        <HistoryEntry key={id} nameOfGame={game} players={players} />
      ))}
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
