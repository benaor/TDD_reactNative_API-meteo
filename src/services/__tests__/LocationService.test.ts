import LocationService from '../LocationService'

describe('LocationService', () => {
  test('should return latitude and longitude of the current location', async () => {
    const position = await LocationService.getCurrentPosition()
    expect(position).toEqual({
      latitude: 0,
      longitude: 0,
    })
  })
})