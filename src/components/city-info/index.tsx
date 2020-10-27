import { CityInfo } from '../../utils'
import React from 'react'
import styled from 'styled-components'

interface CityInfoProps extends CityInfo {
  visible?: boolean
}

const Container = styled.div<{ visible?: boolean }>`
  border: 2px dotted royalblue;
  display: flex;
  flex-direction: column;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  min-width: 10%;
  width: max-content;
  height: max-content;
  padding: 0 1rem;
  border-radius: 1rem;
  margin-top: 0.5rem;
`

const Text = styled.p<{ size?: string }>`
  font-size: ${({ size }) => (size ? size : '0.875rem')};
  font-weight: 400;
  margin-left: 2px;
`

const Url = styled.a`
  font-size: 1rem;
  font-weight: 400;
  margin-left: 2px;
`

export const CityInfoComponent: React.FC<CityInfoProps> = ({
  aqi,
  name,
  uniqueId,
  url,
  visible = false,
}) => {
  return (
    <Container visible={visible}>
      <Text>{`AQI: ${aqi}`}</Text>
      <Text>{`Name: ${name}`}</Text>
      <Url href={url} target="_blank">{`Link: ${url}`}</Url>
      <Text>{`Id: ${uniqueId}`}</Text>
    </Container>
  )
}
