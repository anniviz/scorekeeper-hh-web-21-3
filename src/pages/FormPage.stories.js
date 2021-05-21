import React from 'react'
import FormPage from './FormPage'

export default {
  title: 'pages/Form',
  component: FormPage,
}

export const DefaultForm = args => <FormPage {...args} />
DefaultForm.args = {}
