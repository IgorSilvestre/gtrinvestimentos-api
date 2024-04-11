import { Router } from 'express'
import { externalApiController } from '../../../modules/externalAPI/infra/express/externalApiController'

export const locationsSubRouter = Router()


/**
 * @param state - Brazilian state as acronym (e.g. SP, RJ, MG)
 */
locationsSubRouter.get(
  '/citiesByState/:state',
  externalApiController.locationsSubController.getCitiesByState,
)

/**
 * @param ApiId - The city's API ID
*/
locationsSubRouter.get(
  '/neighberhoodByCityApiId/:apiId',
  externalApiController.locationsSubController.getNeighberhoodByCityApiId,
)

/**
 * @param ApiId - The neiberhood's API ID
*/
locationsSubRouter.get(
  '/streetByNeighberhoodApiId/:apiId',
  externalApiController.locationsSubController.getStreetByNeighberhoodApiId,
)

locationsSubRouter.get(
  '/BrazilStates',
  externalApiController.locationsSubController.getBrazilStates,
)
