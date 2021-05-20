import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from './Button'
// import Button from './Button'

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default function Form({ onSubmit }) {
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Label>
        Name of game
        <Input name="gameName" type="text" placeholder="e.g.Carcassonne" />
      </Label>
      <Label>
        Player names
        <Input
          name="playerName"
          type="text"
          placeholder="e.g. John Doe, Jane Doe"
        />
      </Label>
      <Button>Create game</Button>
      {/* <button>Create game</button> */}
    </FormWrapper>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const game = form.elements.gameName
    const player = form.elements.playerName
    onSubmit({ game: game.value, player: player.value })
    form.reset()
    game.focus()
  }
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
`

const Label = styled.label`
  display: grid;
  gap: 4px;
`

const Input = styled.input`
  padding: 4px;
`
