import { getBrazilStates } from './endpoints/getBrazilStates.locationsSubService'
import { getCitiesByState } from './endpoints/getCitiesByState.locationsSubService'
import { getNeighborhoodByCityApiId } from './endpoints/getNeighborhoodByCityApiId.locationsSubService'
import { getStreetByNeighborhoodApiId } from './endpoints/getStreetByNeighborhoodApiId.locationsSubService'

export const locationsSubService = {
  getCitiesByState,
  getNeighborhoodByCityApiId,
  getBrazilStates,
  getStreetByNeighborhoodApiId,
}
