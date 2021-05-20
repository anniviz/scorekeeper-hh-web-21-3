import React from 'react'
import Form from './Form'

export default {
  title: 'Form',
  component: Form,
}

export const DefaultForm = args => <Form {...args} />
DefaultForm.args = {}
