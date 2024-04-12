import { Request, Response } from 'express'
import { AppError } from '../../../../../../../shared/AppError'
import { errorMessageKeys } from '../../../../../../../shared/keys/errorMessageKeys'
import { externalAPIService } from '../../../../../service/externalAPIService'

export async function getStreetByNeighberhoodApiId(req: Request, res: Response) {
  const { apiId } = req.params

  if (!apiId || typeof apiId !== 'string')
    return res.status(400).json({ error: errorMessageKeys.noQuery })

  try {
    const streetsResponse =
      await externalAPIService.locationsSubService.getStreetByNeighborhoodApiId(apiId)

    if (streetsResponse instanceof AppError) {
      return res
        .status(streetsResponse.status || 500)
        .json({ error: streetsResponse.message })
    }

    return res.status(200).json(streetsResponse)
  } catch (error) {
    console.error('Error fetching data:', error)
    return res
      .status(500)
      .json({ clientMessage: errorMessageKeys.cantSearch, error: error })
  }
}
