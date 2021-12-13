import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {View} from 'react-native'
import HomeScreen from './HomeScreen'
import WeatherScreen from './WeatherScreen'

export type RootStackParamList = {
  Home: undefined
  Weather: {latitude: Number; longitude: Number}
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Weather" component={WeatherScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
