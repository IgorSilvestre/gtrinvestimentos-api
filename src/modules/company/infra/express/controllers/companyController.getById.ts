import { Request, Response } from 'express'
import { CompanyService } from '../../../service/companyService'
import { AppError } from '../../../../../shared/AppError'
import { ZCompany } from '../../../interfaces-validation/ZCompany'

export async function getById (req: Request, res: Response) {
  const { id } = req.params
  const company: ZCompany | AppError = await CompanyService.getById(id)
  if (company instanceof AppError) {
    return res.status(company.status).json({ error: company.message })
  }

  return res.status(200).json(company as ZCompany)
}