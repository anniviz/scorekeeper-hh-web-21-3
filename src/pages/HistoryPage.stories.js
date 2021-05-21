import React from 'react'
import HistoryPage from './HistoryPage'

export default {
  title: 'pages/HistoryPage',
  component: HistoryPage,
}

const Template = args => <HistoryPage {...args} />

export const HistoryPageOneEntry = Template.bind({})
HistoryPageOneEntry.args = {
  savedGames: [
    {
      id: 'foo123',
      game: 'Carcassonne',
      players: [
        { name: 'Jane', score: 20 },
        { name: 'John', score: 17 },
      ],
    },
  ],
}

export const HistoryPageThreeEntries = Template.bind({})
HistoryPageThreeEntries.args = {
  savedGames: [
    {
      id: 'foo123',
      game: 'Carcassonne',
      players: [
        { name: 'Jane', score: 20 },
        { name: 'John', score: 17 },
      ],
    },
    {
      id: 'bar123',
      game: 'Ticket to Ride',
      players: [
        { name: 'Jane', score: 20 },
        { name: 'John', score: 17 },
        { name: 'Mel', score: 200 },
        { name: 'Christian', score: 107 },
      ],
    },
    {
      id: 'baz123',
      game: 'Carcassonne',
      players: [
        { name: 'Michael', score: 45 },
        { name: 'Thomas', score: 1257 },
      ],
    },
  ],
}
