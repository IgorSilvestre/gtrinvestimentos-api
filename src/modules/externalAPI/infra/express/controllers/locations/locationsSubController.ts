import { getBrazilStates } from "./controllers/getBrazilStates.locationsSubController";
import { getCitiesByState } from "./controllers/getCitiesByState.locationsSubController";
import { getNeighberhoodByCityApiId } from "./controllers/getNeiberhoodByCityApiId.locationsSubController";
import { getStreetByNeighberhoodApiId } from "./controllers/getStreetByNeighberhoodApiId.locationsSubController";

export const locationsSubController = {
  getCitiesByState,
  getNeighberhoodByCityApiId,
  getBrazilStates,
  getStreetByNeighberhoodApiId
}