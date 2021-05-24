import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CurrentGamePage from './CurrentGamePage'

describe('CurrentGamePage', () => {
  it('renders a header, a player list with scores, and six buttons', () => {
    render(
      <CurrentGamePage
        updateScore={jest.fn()}
        resetScores={jest.fn()}
        endGame={jest.fn()}
        currentGame="Carcassonne"
        players={[
          { name: 'John', score: 20 },
          { name: 'Jane', score: 10 },
        ]}
      />
    )
    expect(
      screen.getByRole('heading', { name: 'Carcassonne' })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveTextContent('Carcassonne')

    expect(screen.getAllByRole('player')).toHaveLength(2)
    expect(screen.getAllByRole('status')).toHaveLength(2)

    expect(screen.getAllByRole('button', { name: '+' })).toHaveLength(2)
    expect(screen.getAllByRole('button', { name: '-' })).toHaveLength(2)

    expect(
      screen.getByRole('button', { name: 'Reset scores' })
    ).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'End game' })).toBeInTheDocument()
  })

  it('calls updateScore with the right arguments', () => {
    const updateScore = jest.fn()

    render(
      <CurrentGamePage
        updateScore={updateScore}
        resetScores={jest.fn()}
        endGame={jest.fn()}
        currentGame="Carcassonne"
        players={[
          { name: 'John', score: 20 },
          { name: 'Jane', score: 10 },
        ]}
      />
    )
    const buttonsPlus = screen.getAllByRole('button', { name: '+' })
    const buttonsMinus = screen.getAllByRole('button', { name: '-' })

    userEvent.click(buttonsMinus[0])
    expect(updateScore).toHaveBeenCalledWith(0, -1)
    userEvent.click(buttonsMinus[1])
    expect(updateScore).toHaveBeenCalledWith(1, -1)
    userEvent.click(buttonsPlus[0])
    expect(updateScore).toHaveBeenCalledWith(0, 1)
    userEvent.click(buttonsPlus[1])
    expect(updateScore).toHaveBeenCalledWith(1, 1)
  })
})
