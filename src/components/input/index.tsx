import React from 'react'
import styled from 'styled-components'

export type InputProps = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const TextFieldComp = styled.input`
  width: auto;
  min-width: 17.5rem;
  height: 2.625rem;
  border-radius: 0.625rem;
  border: 1px solid #1abc9c;
  padding-left: 0.625rem;
  font-size: 1rem;

  &:focus,
  &:active,
  &:hover {
    border: 1px solid royalblue;
    outline: none;
  }
`

export const TextField: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = 'Type a city name to search ...',
}) => {
  return (
    <TextFieldComp
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}
