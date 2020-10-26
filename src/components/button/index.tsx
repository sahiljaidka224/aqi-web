import React from 'react'
import styled from 'styled-components'

type ButtonProps = {
  isEnabled?: boolean
  name?: string
}

const ButtonComp = styled.button<{ isEnabled: boolean }>`
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  display: inline-block;
  line-height: 1;
  margin-left: 1rem;
  font-size: 14px;
  padding: 11px 20px;
  background-color: #1ea7fd;
  cursor: ${({ isEnabled }) => (isEnabled ? 'pointer' : 'not-allowed')};
  color: ${({ isEnabled }) => (isEnabled ? 'white' : '#333')};
  background-color: ${({ isEnabled }) =>
    isEnabled ? '#1ea7fd' : 'transparent'};

  box-shadow: ${({ isEnabled }) =>
    isEnabled ? 'none' : 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset'};

  &:active {
    background-color: ${({ isEnabled }) =>
      isEnabled ? 'lightgrey' : 'transparent'};
  }

  outline: none;
`

export const Button: React.FC<ButtonProps> = ({
  isEnabled = false,
  name = 'Search',
}) => {
  return (
    <ButtonComp isEnabled={isEnabled} disabled={!isEnabled}>
      {name}
    </ButtonComp>
  )
}
