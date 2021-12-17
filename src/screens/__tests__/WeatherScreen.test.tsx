import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {act} from 'react-test-renderer'
import {
  fetchWeather,
  fetchWeatherFailure,
  fetchWeatherSuccess,
} from '../../store/weather/actions'
import {nullWeather} from '../../types/Weather'
import {fireEvent, mockStore, render, waitFor} from '../../utils/test.utils'
import WeatherScreen from '../WeatherScreen'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({goBack: jest.fn()}),
    useRoute: jest.fn().mockReturnValue({params: {longitude: 0, latitude: 0}}),
  }
})

describe('WeatherScreen', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherScreen />)
    wrapper.getByTestId('weather-screen')
  })

  // Doit aller chercher la météo
  test('Should fetch weather', async () => {
    const interceptor = jest.fn()
    const store = mockStore(interceptor)

    render(<WeatherScreen />, {store})
    await waitFor(() => {
      expect(interceptor).toHaveBeenCalledWith(fetchWeather(0, 0))
    })
  })

  // Doit afficher un loader quand on va chercher la météo
  test('Should display loader when fetching weather', () => {
    const wrapper = render(<WeatherScreen />)
    wrapper.getByTestId('weather-screen-loader')
  })

  // Doit afficher les erreurs
  test('Should display given error', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, {store})

    act(() => {
      store.dispatch(fetchWeatherFailure('mock-error'))
    })

    wrapper.getByText('mock-error')
  })

  test('Should not display icon when weather has no icon', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, {store})

    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather))
    })

    expect(() => wrapper.getByTestId('weather-screen-icon')).toThrow()
  })

  test('Should display description from given weather', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, {store})

    act(() => {
      store.dispatch(
        fetchWeatherSuccess({...nullWeather, description: 'mock-description'}),
      )
    })

    wrapper.getByText('mock-description')
  })

  test('Should not display description when given weather has no description', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, {store})

    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather))
    })

    expect(() => wrapper.getByTestId('weather-screen-description')).toThrow()
  })

  test('Should display city name from given weather', () => {
    const store = mockStore()
    const wrapper = render(<WeatherScreen />, {store})

    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, city: 'mock-city'}))
    })

    wrapper.getByText('mock-city')
  })
})
