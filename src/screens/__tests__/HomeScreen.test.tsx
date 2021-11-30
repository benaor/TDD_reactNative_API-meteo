import React from 'react'
import {render} from '@testing-library/react-native'
import HomeScreen from '../HomeScreen'

describe('HomeScreen', () => {
  test('Should render correctly', () => {
    const wrapper = render(<HomeScreen />)
    wrapper.getByTestId('home-screen')
  })

  describe('title section', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(95668400000) // Correspond to 1 JAN 2000
    })
    afterEach(() => {
      jest.useRealTimers()
    })

    test('should contain current date', () => {
      const wrapper = render(<HomeScreen />)
      wrapper.getByText('Jan 01, 2000')
    })
  })
})
