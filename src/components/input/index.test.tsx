import React from 'react'
import { TextField } from '.'
import { mount } from 'enzyme'

describe('Input field tests', () => {
  it('Renders', () => {
    const onChange = jest.fn()
    const textInput = mount(<TextField value="Test" onChange={onChange} />)
    expect(textInput).toBeTruthy()
  })

  it('Value should be equal to the passed prop', () => {
    const onChange = jest.fn()
    const textInput = mount(<TextField value="" onChange={onChange} />)
    expect(textInput.text()).toBe('')
  })
})
