import PropTypes from 'prop-types'
import styled from 'styled-components'

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labelText: PropTypes.string,
  placeholderText: PropTypes.string,
}

export default function Form({ onSubmit, labelText, placeholderText }) {
  return (
    <form onSubmit={handleSubmit}>
      <Label>
        {labelText}
        <Input name="name" type="text" placeholder={placeholderText} />
      </Label>
    </form>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const input = form.elements.name
    onSubmit(input.value)
    form.reset()
    input.focus()
  }
}

const Label = styled.label`
  display: grid;
  gap: 4px;
`

const Input = styled.input`
  padding: 4px;
`
