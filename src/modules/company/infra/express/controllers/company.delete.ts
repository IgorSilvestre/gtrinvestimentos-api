import { Request, Response } from 'express'
import { CompanyService } from '../../../companyService'
import { AppError } from '../../../../../shared/AppError'

export async function remove (req: Request, res: Response) {
  const { id } = req.params
  const result = await CompanyService.delete(id)

  if (result instanceof AppError) return res.status(result.status).json({ error: result.message });
  console.log(result)
  return res.status(204).json(result)
}