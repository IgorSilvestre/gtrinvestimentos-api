import { Request, Response } from 'express'
import { CompanyService } from '../../../service/companyService'
import { AppError } from '../../../../../shared/AppError'
import { DeleteResult } from 'mongodb'

export async function remove (req: Request, res: Response) {
  const { id } = req.params
  const result: DeleteResult | AppError = await CompanyService.remove(id)

  if (result instanceof AppError) return res.status(result.status).json({ error: result.message });
  return res.status(204).json(result)
}