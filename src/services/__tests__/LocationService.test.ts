import LocationService from '../LocationService'

describe('LocationService', () => {
  // Doit renvoyer la latitude et la longitude de l'emplacement actuel
  test('Should return latitude & longitude from current location', async () => {
    const position = await LocationService.getCurrentPosition()
    expect(position).toEqual({
      latitude: 0,
      longitude: 0,
    })
  })
})
