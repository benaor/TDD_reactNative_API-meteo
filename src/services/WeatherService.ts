import axios, {AxiosResponse} from 'axios'
import {WeatherType} from '../types/Weather'
import {CurrentWeatherRawResponseDto} from './dto/weather-service.dto'

class WeatherService {
  static async fetchCurrentWeather(
    lat: number,
    lon: number,
  ): Promise<WeatherType> {
    return axios
      .get<CurrentWeatherRawResponseDto>(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat,
            lon,
            appid: '910c86fa056451e51d511b3c005894cc',
            units: 'metric',
          },
        },
      )
      .then(WeatherService.formatCurrentWeatherResponse)
  }

  private static async formatCurrentWeatherResponse(
    response: AxiosResponse<CurrentWeatherRawResponseDto>,
  ) {
    const {data} = response
    const weather = data.weather[0]

    return {
      temperature: data.main.temp,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      icon: weather
        ? `http://openweathermap.org/img/wn/${weather.icon}@4x.png`
        : null,
      description: weather?.description ?? null,
      city: data.name,
    }
  }
}

export default WeatherService
