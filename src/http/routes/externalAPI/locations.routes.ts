import { Router } from 'express'
import { externalApiController } from '../../../modules/externalAPI/infra/express/externalApiController'

export const locationsSubRouter = Router()


/**
 * @param state - Brazilian state as acronym (e.g. SP, RJ, MG)
 */
locationsSubRouter.get(
  '/cities-by-state/:state',
  externalApiController.locationsSubController.getCitiesByState,
)

/**
 * @param ApiId - The city's API ID
*/
locationsSubRouter.get(
  '/neighberhood-by-city-apiId/:apiId',
  externalApiController.locationsSubController.getNeighberhoodByCityApiId,
)

/**
 * @param ApiId - The neiberhood's API ID
*/
locationsSubRouter.get(
  '/street-by-neighberhood-apiId/:apiId',
  externalApiController.locationsSubController.getStreetByNeighberhoodApiId,
)

locationsSubRouter.get(
  '/Brazil-states',
  externalApiController.locationsSubController.getBrazilStates,
)
