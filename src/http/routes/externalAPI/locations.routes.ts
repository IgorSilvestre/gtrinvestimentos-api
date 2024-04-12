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
  '/neighborhood-by-city-apiId/:apiId',
  externalApiController.locationsSubController.getNeighborhoodByCityApiId,
)

/**
 * @param ApiId - The neiborhood's API ID
*/
locationsSubRouter.get(
  '/street-by-neighborhood-apiId/:apiId',
  externalApiController.locationsSubController.getStreetByNeighborhoodApiId,
)

locationsSubRouter.get(
  '/Brazil-states',
  externalApiController.locationsSubController.getBrazilStates,
)
