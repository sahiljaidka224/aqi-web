import { InputProps, TextField } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

import React from 'react'

export default {
  title: 'Components/Input',
  component: TextField,
} as Meta

const Template: Story<InputProps> = (args) => <TextField {...args} />

export const SimpleTextField = Template.bind({})
SimpleTextField.args = {
  placeholder: 'Storybook',
}
