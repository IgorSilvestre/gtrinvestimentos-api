import { Request, Response } from 'express'
import { AppError } from '../../../../../../../shared/AppError'
import { errorMessageKeys } from '../../../../../../../shared/keys/errorMessageKeys'
import { externalAPIService } from '../../../../../service/externalAPIService'

export async function getNeighberhoodByCityApiId(req: Request, res: Response) {
  const { apiId } = req.params

  if (!apiId || typeof apiId !== 'string')
    return res.status(400).json({ error: errorMessageKeys.noQuery })

  try {
    const citiesResponse =
      await externalAPIService.locationsSubService.getNeighberhoodByCityApiId(apiId)

    if (citiesResponse instanceof AppError) {
      return res
        .status(citiesResponse.status || 500)
        .json({ error: citiesResponse.message })
    }

    return res.status(200).json(citiesResponse)
  } catch (error) {
    console.error('Error fetching data:', error)
    return res
      .status(500)
      .json({ clientMessage: errorMessageKeys.cantSearch, error: error })
  }
}
