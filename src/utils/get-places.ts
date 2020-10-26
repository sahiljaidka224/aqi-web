import { Constants } from './constants'

export type AirQualityInfo = {
  aqi: string
  name: string
  country: string
}

export type PlacesResponse = {
  citiesInfo?: AirQualityInfo[]
  error?: string
}

export const getPlaces = async (keyword: string): Promise<PlacesResponse> => {
         const { BASE_URL, TAIL_URL, NETWORK_ERROR } = Constants

         const url = `${BASE_URL}search/?keyword=${keyword}&${TAIL_URL}`
         const response = await fetch(url)
         const result = await response.json()

         if (!result || !result.status || result.status !== 'ok') {
           // as per the docs, API will only return message field in case of error
           if (result.message) return { error: result.message }
         }

         if (!result.data) return { error: NETWORK_ERROR }

         const citiesInfo: AirQualityInfo[] = result.data.map((info: any) => {
           /*
    TODO:
      Optional chaining can be used here like
      aqi: info?.aqi
      name: info?.station?.name

      but babel-loader was not compiling it, so leaving it as TODO for now
    */
           const cityInfo: AirQualityInfo = {
             aqi: info && info.aqi ? info.aqi : '',
             name:
               info && info.station && info.station.name
                 ? info.station.name
                 : '',
             country:
               info && info.station && info.station.country
                 ? info.station.country
                 : '',
           }

           return cityInfo
         })

         return { citiesInfo }
       }
