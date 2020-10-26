import { Header } from '.'
import React from 'react'
import { mount } from 'enzyme'

describe('Header tests', () => {
  it('Renders without default value', () => {
    const header = mount(<Header />)
    expect(header).toBeTruthy()
  })

  it('Title should be equal to default', () => {
    const header = mount(<Header />)
    expect(header.text()).toBe('Air Quality Index')
  })

  it('Title should be equal to value passed', () => {
    const header = mount(<Header title="Test" />)
    expect(header.text()).toBe('Test')
  })
})
