import {useNavigation} from '@react-navigation/native'
import {fireEvent, render, waitFor} from '@testing-library/react-native'
import React from 'react'
import WeatherCoordinates from '../WeatherCoordinates'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({navigate: jest.fn()}),
  }
})

describe('WeatherCoordinates', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherCoordinates />)
    wrapper.getByTestId('weather-coordinates')
  })

  // Doit naviguer vers l'écran Météo avec les coordonnées données lorsque le formulaire valide est soumis
  test('Should navigate to Weather screen with given coordinates when valid form is submit', async () => {
    const mockNavigate = jest.fn()
    ;(useNavigation as jest.Mock).mockReturnValueOnce({navigate: mockNavigate})

    const wrapper = render(<WeatherCoordinates />)

    const fields = {
      latitude: wrapper.getByTestId('weather-coordinates-latitude'),
      longitude: wrapper.getByTestId('weather-coordinates-longitude'),
    }

    fireEvent.changeText(fields.latitude, '0')
    fireEvent.changeText(fields.longitude, '0')

    const button = wrapper.getByTestId('button')
    fireEvent.press(button)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Weather', {
        latitude: 0,
        longitude: 0,
      })
    })
  })

  describe('Latitude field', () => {
    // Ne devrait pas afficher d'erreur lorsque la valeur est la valeur la plus basse
    test('Should not show error when value is the lowest range value', () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-latitude')
      fireEvent.changeText(field, '-90')

      return expect(
        wrapper.findByText('La latitude doit être un nombre valide'),
      ).rejects.toThrow()
    })

    // Ne devrait pas afficher d'erreur lorsque la valeur est la valeur de plage la plus élevée
    test('Should not show error when value is the highest range value', () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-latitude')
      fireEvent.changeText(field, '90')

      return expect(
        wrapper.findByText('La latitude doit être un nombre valide'),
      ).rejects.toThrow()
    })

    // Devrait afficher une erreur lorsque la valeur est inférieure à la valeur de plage la plus basse
    test('Should show error when value is lower than the lowest range value', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-latitude')
      fireEvent.changeText(field, '-91')

      await waitFor(() => {
        wrapper.getByText('La latitude doit être un nombre valide')
      })
    })

    // Devrait afficher une erreur lorsque la valeur est supérieure à la valeur de plage la plus élevée
    test('Should show error when value is higher than the highest range value', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-latitude')
      fireEvent.changeText(field, '91')

      await waitFor(() => {
        wrapper.getByText('La latitude doit être un nombre valide')
      })
    })

    // Devrait afficher une erreur lorsque la valeur n'est pas un nombre
    test('Should show error when value is not a number', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-latitude')
      fireEvent.changeText(field, 'a')

      await waitFor(() => {
        wrapper.getByText('La latitude doit être un nombre valide')
      })
    })
  })

  describe('Longitude field', () => {
    // Ne devrait pas afficher d'erreur lorsque la valeur est la valeur la plus basse de la plage
    test('Should not show error when value is the lowest range value', () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-longitude')
      fireEvent.changeText(field, '-180')

      return expect(
        wrapper.findByText('La longitude doit être un nombre valide'),
      ).rejects.toThrow()
    })

    // Ne devrait pas afficher d'erreur lorsque la valeur est la valeur de plage la plus élevée
    test('Should not show error when value is the highest range value', () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-longitude')
      fireEvent.changeText(field, '180')

      return expect(
        wrapper.findByText('La longitude doit être un nombre valide'),
      ).rejects.toThrow()
    })

    // Devrait afficher une erreur lorsque la valeur est inférieure à la valeur minimale de la plage
    test('Should show error when value is lower than the lowest range value', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-longitude')
      fireEvent.changeText(field, '-181')

      await waitFor(() => {
        wrapper.getByText('La longitude doit être un nombre valide')
      })
    })

    // Devrait afficher une erreur lorsque la valeur est supérieur à la valeur max de la plage
    test('Should show error when value is higher than the highest range value', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-longitude')
      fireEvent.changeText(field, '181')

      await waitFor(() => {
        wrapper.getByText('La longitude doit être un nombre valide')
      })
    })

    // Devrait afficher une erreur si la valeur n'est pas un nombre
    test('Should show error when value is not a number', async () => {
      const wrapper = render(<WeatherCoordinates />)

      const field = wrapper.getByTestId('weather-coordinates-longitude')
      fireEvent.changeText(field, 'a')

      await waitFor(() => {
        wrapper.getByText('La longitude doit être un nombre valide')
      })
    })
  })
})
