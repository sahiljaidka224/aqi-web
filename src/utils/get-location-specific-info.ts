import { Constants } from './constants'

export const getLocationSpecificInfo = async (name: string) => {
  const { BASE_URL, TAIL_URL, NETWORK_ERROR } = Constants

  const url = `${BASE_URL}feed/${name}/?${TAIL_URL}`
  const response = await fetch(url)
  const result = await response.json()

  if (!result || !result.status || result.status !== 'ok') {
    // as per the docs, API will only return message field in case of error
    if (result.message) return { error: result.message }
  }

  if (!result.data) return { error: NETWORK_ERROR }

  console.log({ result })

  return result
}
