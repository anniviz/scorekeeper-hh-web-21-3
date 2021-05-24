import PropTypes from 'prop-types'
import styled from 'styled-components'

Player.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  onMinus: PropTypes.func.isRequired,
  onPlus: PropTypes.func.isRequired,
}
export default function Player({ name, score, onMinus, onPlus }) {
  return (
    <FlexContainer role="player">
      {name}{' '}
      <FlexContainer>
        <button onClick={onMinus}>-</button>
        <Score>{score}</Score>
        <button onClick={onPlus}>+</button>
      </FlexContainer>
    </FlexContainer>
  )
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`

const Score = styled.output`
  width: 3ch;
  text-align: right;
`
