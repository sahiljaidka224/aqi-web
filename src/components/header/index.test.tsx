import { Header } from '.'
import React from 'react'
import { mount } from 'enzyme'

describe('Header tests', () => {
  it('Renders without default value', () => {
    const header = mount(<Header />)

    expect(header).toBeTruthy()
  })
})
