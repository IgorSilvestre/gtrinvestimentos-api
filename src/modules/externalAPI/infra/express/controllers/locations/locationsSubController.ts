import { getBrazilStates } from './controllers/getBrazilStates.locationsSubController'
import { getCitiesByState } from './controllers/getCitiesByState.locationsSubController'
import { getNeighborhoodByCityApiId } from './controllers/getNeiborhoodByCityApiId.locationsSubController'
import { getStreetByNeighborhoodApiId } from './controllers/getStreetByNeighborhoodApiId.locationsSubController'

export const locationsSubController = {
  getCitiesByState,
  getNeighborhoodByCityApiId,
  getBrazilStates,
  getStreetByNeighborhoodApiId,
}
