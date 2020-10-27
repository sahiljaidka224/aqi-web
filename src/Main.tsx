import {
  AirQualityInfo,
  CityInfo,
  PlacesResponse,
  getLocationSpecificInfo,
  getPlaces,
} from './utils'
import { Button, CityInfoComponent, Header, TextField } from './components'
import React, { useState } from 'react'

import styled from 'styled-components'

interface State extends PlacesResponse {
  cityData?: CityInfo
  loading?: boolean
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
  text-align: center;
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

const CitiesWrapper = styled.div`
    margin-right: 1rem;
`

export const App = () => {
  const [searchVal, updateSearchVal] = useState('')
  const [state, updateState] = useState<State | undefined>()

  const getPlacesBasedOnKeyword = async () => {
    const aqiInfo = await getPlaces(searchVal.trim())
    if (aqiInfo.citiesInfo && aqiInfo.citiesInfo.length === 0) {
      updateState({
        error: 'Please try with different city name!',
        loading: false,
      })
    } else {
      updateState({ ...state, ...aqiInfo, loading: false, error: undefined })
    }
  }

  /* 
    On form submit, we check for value in text-field and make a API call based on that
  */
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateState({
      loading: true,
      error:
        searchVal.trim().length === 0
          ? 'Please try again with a real word!'
          : undefined,
    })

    if (searchVal.trim().length > 0) {
      getPlacesBasedOnKeyword()
    }
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchVal(event.target.value)
  }

  const onClear = () => {
    updateState(undefined)
  }

  const getResultsBasedOnCityName = async (name: string) => {
    const result = await getLocationSpecificInfo(name)

    updateState({
      ...state,
      cityData: result.cityInfo,
      loading: false,
      error: result.error ? result.error : undefined,
    })

    // Scrolling to top incase user can't see the results of it's action
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <Wrapper>
      <Header />
      <Form onSubmit={onFormSubmit}>
        <TextField value={searchVal} onChange={onSearchChange} />
        <Button isEnabled={searchVal.trim().length > 0} />
        <ClearButtonWrapper
          visible={state && state.citiesInfo && state.citiesInfo.length > 0}
        >
          <Button
            isEnabled={true}
            name="Clear Results"
            onClick={onClear}
            type="button"
          />
        </ClearButtonWrapper>
      </Form>

      {state?.error && <Error>{state?.error}</Error>}
      <FormResultsContainer>
        <CitiesWrapper>
          {state?.citiesInfo &&
            state.citiesInfo.map((info: AirQualityInfo, index: number) => {
              const { name } = info
              const onCityClick = () => {
                updateState({ ...state, loading: true })
                getResultsBasedOnCityName(name)
              }
              return (
                <CitiesInfoWrapper key={index} onClick={onCityClick}>
                  <Text>{name}</Text>
                  <Text size="0.625rem">Click me</Text>
                </CitiesInfoWrapper>
              )
            })}
        </CitiesWrapper>
        {state && state.loading && <Text size="2rem">Loading...</Text>}
        <CityInfoComponent
          aqi={state?.cityData?.aqi || ''}
          name={state?.cityData?.name || ''}
          uniqueId={state?.cityData?.uniqueId || ''}
          url={state?.cityData?.url || ''}
          visible={state && state.cityData ? true : false}
        />
      </FormResultsContainer>
    </Wrapper>
  )
}
