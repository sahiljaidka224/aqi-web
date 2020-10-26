import { AirQualityInfo, PlacesResponse, getPlaces } from './utils'
import { Button, Header, TextField } from './components'
import React, { useState } from 'react'

import styled from 'styled-components'

const Wrapper = styled.div``

const Form = styled.form`
  margin-top: 0.625rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Error = styled.p`
  color: red;
  text-align: center;
`

const CityInfoWrapper = styled.button`
  border: 1px solid #a1b4f1;
  display: flex;
  height: 3rem;
  padding: 0.25px 10px;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem auto;
  border-radius: 3em;
  background-color: transparent;
  min-width: 40%;
  outline: none;

  &:active {
    background-color: lightgrey;
  }
`

const Text = styled.p<{ size?: string }>`
  font-size: ${({ size }) => (size ? size : '0.875rem')};
  font-weight: 300;
  text-align: center;
`

export const App = () => {
  const [searchVal, updateSearchVal] = useState('')
  const [loading, updateLoading] = useState(false)
  const [aqiData, updateAqiData] = useState<PlacesResponse | undefined>()
  const getResultsBasedOnKeyword = async () => {
    const aqiInfo = await getPlaces(searchVal)
    updateAqiData(aqiInfo)
    updateLoading(false)
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateLoading(true)
    getResultsBasedOnKeyword()
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchVal(event.target.value)
  }

  return (
    <Wrapper>
      <Header />
      <Form onSubmit={onFormSubmit}>
        <TextField value={searchVal} onChange={onSearchChange} />
        <Button isEnabled={searchVal.length > 0} />
      </Form>
      {loading && <Text size="2rem">Loading..</Text>}
      {aqiData?.error && <Error>{aqiData?.error}</Error>}
      {aqiData?.citiesInfo &&
        aqiData.citiesInfo.map((info: AirQualityInfo, index: number) => {
          const { aqi, name } = info
          return (
            <CityInfoWrapper key={index}>
              <Text>{name}</Text>
              <Text size="1rem">{`AQI: ${aqi}`}</Text>
            </CityInfoWrapper>
          )
        })}
    </Wrapper>
  )
}
