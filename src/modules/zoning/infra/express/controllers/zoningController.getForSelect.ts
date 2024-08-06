import { Request, Response } from 'express'
import { AppError } from '../../../../../shared/AppError'
import { ZZoning } from '../../../interfaces-validation/ZZoning'
import { ZoningService } from '../../../service/ZoningService'

export async function getForSelect (_: Request, res: Response) {
  const zonings: ZZoning[] | AppError = await ZoningService.getForSelect()

  if (zonings instanceof AppError) {
    return res.status(zonings.status).json({ error: zonings.message })
  }
  return res.status(200).json(zonings as ZZoning[])
}

