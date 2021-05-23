import { render, screen } from '@testing-library/react'
import HistoryPage from './HistoryPage'

describe('HistoryPage', () => {
  it('renders HistoryPage with all elements', () => {
    render(
      <HistoryPage
        savedGames={[
          {
            id: 'foo123',
            game: 'Carcassonne',
            players: [
              { name: 'John', score: 20 },
              { name: 'Jane', score: 10 },
            ],
          },
          {
            id: 'bar123',
            game: 'Ticket to Ride',
            players: [
              { name: 'Johann', score: 320 },
              { name: 'Janette', score: 410 },
              { name: 'John', score: 20 },
            ],
          },
        ]}
      />
    )

    expect(
      screen.getByRole('heading', { name: 'Carcassonne' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Ticket to Ride' })
    ).toBeInTheDocument()

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(5)
    expect(listItems[0]).toHaveTextContent('John')
    expect(listItems[0]).toHaveTextContent('20')
    expect(listItems[1]).toHaveTextContent('Jane')
    expect(listItems[1]).toHaveTextContent('10')
    expect(listItems[2]).toHaveTextContent('Johann')
    expect(listItems[2]).toHaveTextContent('320')
    expect(listItems[3]).toHaveTextContent('Janette')
    expect(listItems[3]).toHaveTextContent('410')
    expect(listItems[4]).toHaveTextContent('John')
    expect(listItems[4]).toHaveTextContent('20')
  })
})
