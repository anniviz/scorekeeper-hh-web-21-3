import React from 'react'
import CurrentGamePage from './CurrentGamePage'

export default {
  title: 'pages/CurrentGamePage',
  component: CurrentGamePage,
}

const Template = args => <CurrentGamePage {...args} />

export const CurrentGamePageTwoPlayers = Template.bind({})
CurrentGamePageTwoPlayers.args = {
  currentGame: 'Ticket to Ride',
  players: [
    { name: 'Jane', score: 20 },
    { name: 'John', score: 17 },
  ],
}
