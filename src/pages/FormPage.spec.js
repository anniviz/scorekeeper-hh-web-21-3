import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormPage from './FormPage'

describe('FormPage', () => {
  it('renders 2 input fields, two labels and one button', () => {
    render(<FormPage onSubmit={jest.fn()} />)

    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(2)

    const label1 = screen.getByText('Name of game')
    expect(label1).toBeInTheDocument()
    const label2 = screen.getByText('Player names')
    expect(label2).toBeInTheDocument()

    const button = screen.getAllByRole('button')
    expect(button).toHaveLength(1)
  })

  it('creates an object { game: game.value, player: player.value } when submitting the form (click button)', () => {
    const handleSubmit = jest.fn()

    render(<FormPage onSubmit={handleSubmit} />)

    userEvent.type(
      screen.getByRole('textbox', { name: 'Name of game' }),
      'Carcassonne'
    )
    userEvent.type(
      screen.getByRole('textbox', { name: 'Player names' }),
      'John Doe, Jane Doe'
    )

    const button = screen.getByRole('button', { name: 'Create game' })
    userEvent.click(button)

    expect(handleSubmit).toHaveBeenCalledWith({
      game: 'Carcassonne',
      player: 'John Doe, Jane Doe',
    })
  })

  //   it('creates an object { game: game.value, player: player.value } when submitting the form (hit enter)', () => {
  //     const handleSubmit = jest.fn()

  //     render(<FormPage onSubmit={handleSubmit} />)

  //     userEvent.type(
  //       screen.getByRole('textbox', { name: 'Name of game' }),
  //       'Carcassonne'
  //     )
  //     userEvent.type(
  //       screen.getByRole('textbox', { name: 'Player names' }),
  //       'John Doe, Jane Doe{enter}'
  //     )

  //     expect(handleSubmit).toHaveBeenCalledWith({
  //       game: 'Carcassonne',
  //       player: 'John Doe, Jane Doe',
  //     })
  //   })
})
