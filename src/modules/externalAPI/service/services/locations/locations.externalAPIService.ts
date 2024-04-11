import { getBrazilStates } from './endpoints/getBrazilStates.locationsSubService'
import { getCitiesByState } from './endpoints/getCitiesByState.locationsSubService'
import { getNeighberhoodByCityApiId } from './endpoints/getNeighberhoodByCityApiId.locationsSubService'
import { getStreetByNeighborhoodApiId } from './endpoints/getStreetByNeighberhoodApiId.locationsSubService'

export const locationsSubService = {
  getCitiesByState,
  getNeighberhoodByCityApiId,
  getBrazilStates,
  getStreetByNeighborhoodApiId
}
