import { Request, Response } from 'express'
import { AppError } from '../../../../../../../shared/AppError'
import { errorMessageKeys } from '../../../../../../../shared/keys/errorMessageKeys'
import { externalAPIService } from '../../../../../service/externalAPIService'

export async function getBrazilStates(req: Request, res: Response) {

  try {
    const statesResponse =
      await externalAPIService.locationsSubService.getBrazilStates()

    if (statesResponse instanceof AppError) {
      return res
        .status(statesResponse.status || 500)
        .json({ error: statesResponse.message })
    }

    return res.status(200).json(statesResponse)
  } catch (error) {
    console.error('Error fetching data:', error)
    return res
      .status(500)
      .json({ clientMessage: errorMessageKeys.cantSearch, error: error })
  }
}
