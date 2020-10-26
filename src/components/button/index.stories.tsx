import { Button, ButtonProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

import React from 'react'

export default {
  title: 'Components/Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const SimpleButton = Template.bind({})
SimpleButton.args = {
  name: 'Storybook',
  isEnabled: true
}

export const DisabledButton = Template.bind({})
DisabledButton.args = {
  name: 'Storybook',
  isEnabled: false,
}
