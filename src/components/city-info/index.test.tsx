import { CityInfoComponent } from '.'
import React from 'react'
import { mount } from 'enzyme'

describe('CityInfo Component tests', () => {
  it('Renders', () => {
    const cityInfo = mount(
      <CityInfoComponent
        visible={true}
        aqi="Aqi"
        name="name"
        uniqueId="123"
        url="www.google.com"
      />
    )
    expect(cityInfo).toBeTruthy()
  })
})
