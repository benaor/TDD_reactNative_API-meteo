import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {StyleSheet, Text, View} from 'react-native'
import {TextInput} from 'react-native-gesture-handler'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {Colors} from '../constants'
import Button from './Button'

type FormValues = {
  latitude: string
  longitude: string
}

function WeatherCoordinates() {
  // Hooks
  const navigation = useNavigation()

  // si les conditions ne sont pas respecté on recupère un objet dans form.errors
  const validationSchema = Yup.object().shape({
    latitude: Yup.number().min(-90).max(90),
    longitude: Yup.number().min(-180).max(180),
  })

  const defaultValues: FormValues = {
    latitude: '',
    longitude: '',
  }

  const form = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onChange',
  })

  const handleSubmit = form.handleSubmit(values =>
    navigation.navigate('Weather', values),
  )

  return (
    <View testID="weather-coordinates">
      <View style={styles.inputs}>
        <Controller
          control={form.control}
          render={({field: {onChange, ...p}}) => (
            <TextInput
              {...p}
              testID="weather-coordinates-latitude"
              onChangeText={onChange}
              style={styles.input}
              placeholder="Lat"
              placeholderTextColor={Colors.GRAY}
            />
          )}
          name="latitude"
        />
        {form.formState.errors?.latitude && (
          <Text style={styles.error}>
            La latitude doit être un nombre valide
          </Text>
        )}
        <Controller
          control={form.control}
          render={({field: {onChange, ...p}}) => (
            <TextInput
              {...p}
              testID="weather-coordinates-longitude"
              onChangeText={onChange}
              style={styles.input}
              placeholder="Long"
              placeholderTextColor={Colors.GRAY}
            />
          )}
          name="longitude"
        />
        {form.formState.errors?.longitude && (
          <Text style={styles.error}>
            La longitude doit être un nombre valide
          </Text>
        )}
      </View>
      <Button onPress={handleSubmit} label="find" />
    </View>
  )
}

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  input: {
    backgroundColor: Colors.TRANSPARENT,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: Colors.WHITE,
  },
  error: {
    marginHorizontal: 5,
    color: Colors.ERROR,
  },
})

export default WeatherCoordinates
