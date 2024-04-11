import { Request, Response } from 'express'
import { AppError } from '../../../../../shared/AppError'
import { zoningValidation, ZZoning } from '../../../interfaces-validation/ZZoning'
import { ZoningService } from '../../../service/ZoningService'

export async function create(req: Request, res: Response) {
  const zoningDTO = req.body as ZZoning

  const validatedZoningDTO = zoningValidation.safeParse(zoningDTO)
  if (!validatedZoningDTO.success) {
    return res.status(400).json(validatedZoningDTO.error.errors)
  }

  const zoning: ZZoning | AppError = await ZoningService.create(zoningDTO)

  if (zoning instanceof AppError) {
    return res.status(zoning.status).json({ error: zoning.message })
  }
  return res.status(200).json(zoning as ZZoning)
}
