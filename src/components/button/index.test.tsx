import { Button } from '.'
import React from 'react'
import { mount } from 'enzyme'

describe('Button tests', () => {
  it('Button is not clickable by defalt', () => {
    const onClick = jest.fn()
    const button = mount(<Button onClick={onClick} />)
    button.simulate('click')
    expect(onClick).toBeCalledTimes(0)
  })

  it('Button is clickable when enabled', () => {
    const onClick = jest.fn()
    const button = mount(<Button onClick={onClick} isEnabled />)
    button.simulate('click')
    expect(onClick).toBeCalledTimes(1)
  })

  it('Title should be equal to default', () => {
    const button = mount(<Button name="Test" isEnabled />)
    expect(button.text()).toBe('Test')
  })
})
