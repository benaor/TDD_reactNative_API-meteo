import {fireEvent, render} from '@testing-library/react-native'
import React from 'react'
import Button from '../Button'

describe('Button', () => {
  test('should render correctly Button', () => {
    const wrapper = render(<Button label="" onPress={jest.fn()} />)
    wrapper.getByTestId('button')
  })

  test('should render loader', () => {
    const wrapper = render(<Button label="" onPress={jest.fn()} loading />)
    wrapper.getByTestId('button-loading')
  })

  test('should call given onPress when clicked', () => {
    const mockOnPress = jest.fn()
    const wrapper = render(<Button label="" onPress={mockOnPress} />)
    const button = wrapper.getByTestId('button')

    fireEvent.press(button)
    expect(mockOnPress).toHaveBeenCalled()
  })

  test('should render label', () => {
    const wrapper = render(<Button label="mock-label" onPress={jest.fn()} />)
    wrapper.getByText('mock-label')
  })

  test('should accept custom view', () => {
    const wrapper = render(
      <Button label="" onPress={jest.fn()} testID="mock-test-id" />,
    )
    wrapper.getByTestId('mock-test-id')
  })
})
