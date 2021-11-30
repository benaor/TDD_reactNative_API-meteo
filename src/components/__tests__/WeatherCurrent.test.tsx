import React from 'react'
import {render} from '@testing-library/react-native'
import WeatherCurrent from '../WeatherCurrent'

describe('WeatherCurrent', () => {
  test('should render correctly', () => {
    const wrapper = render(<WeatherCurrent />)
    wrapper.getByTestId('weather-current')
  })

  
})
