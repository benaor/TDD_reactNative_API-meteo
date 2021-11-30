import React from 'react'
import {View} from 'react-native'
import {render} from '@testing-library/react-native'
import HomeScreen from '../HomeScreen'
import WeatherCurrent from '../../components/WeatherCurrent'
import WeatherCoordinates from '../../components/WeatherCoordinates'

jest.mock('../../components/WeatherCoordinates', () =>
  jest.fn().mockReturnValue(null),
)
jest.mock('../../components/WeatherCurrent', () =>
  jest.fn().mockReturnValue(null),
)

describe('HomeScreen', () => {
  test('Should render correctly', () => {
    const wrapper = render(<HomeScreen />)
    wrapper.getByTestId('home-screen')
  })

  describe('title section', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(946684800000) // Correspond to 1 JAN 2000
    })
    afterEach(() => {
      jest.useRealTimers()
    })

    test('should contain current date', () => {
      const wrapper = render(<HomeScreen />)
      wrapper.getByText('Jan 01, 2000')
    })

    test('Should contain current day', () => {
      const wrapper = render(<HomeScreen />)
      wrapper.getByText('Saturday')
    })
  })

  test('should contain a section to get current weather', () => {
    ;(WeatherCurrent as jest.Mock).mockReturnValue(
      <View testID="mock-weather-current" />,
    )
    const wrapper = render(<HomeScreen />)
    wrapper.getByTestId('mock-weather-current')
  })

  test('should contain a divider', () => {
    const wrapper = render(<HomeScreen />)
    wrapper.getByTestId('home-screen-divider')
  })

  test('should contain a section to get weather at given longitudes and latitudes', () => {
    ;(WeatherCoordinates as jest.Mock).mockReturnValue(
      <View testID="mock-weather-coordinates" />,
    )
    const wrapper = render(<HomeScreen />)
    wrapper.getByTestId('mock-weather-coordinates')
  })
})
