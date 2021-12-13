import { render } from '@testing-library/react-native';
import * as React from 'react';
import WeatherScreen from '../WeatherScreen';

describe("WeatherScreen", () => {
    test("should render corectly", () => {
        const wrapper = render(<WeatherScreen />)
        wrapper.getByTestId("weather-screen")
    })
})