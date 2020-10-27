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

const Text = styled.p<{ size?: string; weight?: string }>`
  font-size: ${({ size }) => (size ? size : '0.875rem')};
  font-weight: ${({ weight }) => (weight ? weight : '400')};
  margin-left: 2px;
`

const Url = styled.a`
  font-size: 0.875rem;
  font-weight: 400;
  margin: 14px 2px 14px 0px;
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
      <Text weight="bold">{`Id: #${uniqueId}`}</Text>
      <Text>{`AQI: ${aqi}`}</Text>
      <Text>{`Name: ${name}`}</Text>
      <Text>Link: <Url href={url} target="_blank">{`${url}`}</Url></Text>
    </Container>
  )
}
