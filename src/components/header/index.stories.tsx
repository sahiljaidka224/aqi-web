import { Header, HeaderProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

import React from 'react'

export default {
  title: 'Example/Header',
  component: Header,
} as Meta

const Template: Story<HeaderProps> = (args) => <Header {...args} />

export const SimpleHeader = Template.bind({})
SimpleHeader.args = {
  title: 'Title changed from storybook',
}
