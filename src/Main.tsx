import {
  AirQualityInfo,
  CityInfo,
  LocationData,
  PlacesResponse,
  getLocationSpecificInfo,
  getPlaces,
} from './utils'
import { Button, CityInfoComponent, Header, TextField } from './components'
import React, { useState } from 'react'

import styled from 'styled-components'

interface State extends PlacesResponse {
  cityData?: CityInfo
}

const Wrapper = styled.div``

const Form = styled.form`
  margin-top: 0.625rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Error = styled.p`
  color: red;
  margin: 2rem;
`

const CitiesInfoWrapper = styled.button`
  border: 1px solid #a1b4f1;
  display: flex;
  height: 3rem;
  padding: 0.25px 10px;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem;
  border-radius: 3em;
  background-color: transparent;
  min-width: 100%;
  outline: none;

  &:active {
    background-color: lightgrey;
  }
`

const Text = styled.p<{ size?: string }>`
  font-size: ${({ size }) => (size ? size : '0.875rem')};
  font-weight: 300;
  margin-left: 2px;
`

const ClearButtonWrapper = styled.div<{ visible?: boolean }>`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`

const FormResultsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
`

export const App = () => {
  const [searchVal, updateSearchVal] = useState('')
  const [loading, updateLoading] = useState(false)
  const [aqiData, updateAqiData] = useState<PlacesResponse | undefined>()
  const [selectedInfo, updateSelectedInfo] = useState<
    LocationData | undefined
  >()

  const [state, updateState] = useState<State | undefined>()

  const getPlacesBasedOnKeyword = async () => {
    const aqiInfo = await getPlaces(searchVal.trim())
    if (aqiInfo.citiesInfo && aqiInfo.citiesInfo.length === 0) {
      updateState({ error: 'Please try with different city name!' })
    //   updateAqiData({ error: 'Please try with different city name!' })
    } else {
      updateAqiData(aqiInfo)
    }
    updateLoading(false)
  }

  /* 
    On form submit, we check for value in text-field and make a API call based on that
  */
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateLoading(true)

    if (searchVal.trim().length === 0) {
      updateAqiData({
        error: 'Please try again with a real word!',
      })
      return
    }

    getPlacesBasedOnKeyword()
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchVal(event.target.value)
  }

  const onClear = () => {
    updateAqiData(undefined)
  }

  const getResultsBasedOnCityName = async (name: string) => {
    const result = await getLocationSpecificInfo(name)
    updateSelectedInfo(result)
    updateLoading(false)
  }

  return (
    <Wrapper>
      <Header />

      <Form onSubmit={onFormSubmit}>
        <TextField value={searchVal} onChange={onSearchChange} />
        <Button isEnabled={searchVal.trim().length > 0} />
        <ClearButtonWrapper
          visible={
            aqiData && aqiData.citiesInfo && aqiData.citiesInfo.length > 0
          }
        >
          <Button
            isEnabled={true}
            name="Clear Results"
            onClick={onClear}
            type="button"
          />
        </ClearButtonWrapper>
      </Form>

      {aqiData?.error && <Error>{aqiData?.error}</Error>}
      <FormResultsContainer>
        <div>
          {aqiData?.citiesInfo &&
            aqiData.citiesInfo.map((info: AirQualityInfo, index: number) => {
              const { name } = info
              const onCityClick = () => {
                updateLoading(true)
                getResultsBasedOnCityName(name)
              }
              return (
                <CitiesInfoWrapper key={index} onClick={onCityClick}>
                  <Text>{name}</Text>
                  <Text size="0.625rem">Click me</Text>
                </CitiesInfoWrapper>
              )
            })}
        </div>
        {loading && <Text size="2rem">Loading...</Text>}
        <CityInfoComponent
          aqi="1"
          name="1"
          uniqueId="1"
          url="1"
          visible={selectedInfo && selectedInfo.cityInfo ? true : false}
        />
      </FormResultsContainer>
    </Wrapper>
  )
}
