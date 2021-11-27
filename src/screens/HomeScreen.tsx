import {render} from "@testing-library/react-native"
import HomeScreen from "./__tests__/HomeScreen.test"

describe('HomeScreen', () => {
    test('Should render correctly', () => {
        const wrapper = render(<HomeScreen />)
        wrapper.getByTestId("home-screen")
    })
})