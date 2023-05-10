import { Request, Response } from 'express'
import { CompanyService } from '../../../service/companyService'
import { AppError } from '../../../../../shared/AppError'
import { normalizeCompany } from '../../../interfaces-validation/normalizeCompany'
import { ZCompanyModel } from '../../mongo/companySchema'

export async function getById (req: Request, res: Response) {
  const { id } = req.params
  const company: ZCompanyModel | AppError = await CompanyService.getById(id)
  if (company instanceof AppError) {
    return res.status(company.status).json({ error: company.message })
  }
  const a = await normalizeCompany(company)
  return res.status(200).json(a)
}
