import { Request, Response } from 'express'
import { CompanyService } from '../../../service/companyService'
import { AppError } from '../../../../../shared/AppError'
import { normalizeCompanies } from '../../../interfaces-validation/normalizeCompanies'
import { ICompanyDocument } from '../../../interfaces-validation/ICompanyModel'

export async function getById(req: Request, res: Response) {
  const { id } = req.params
  const company: ICompanyDocument | AppError = await CompanyService.getById(id)
  if (company instanceof AppError) {
    return res.status(company.status).json({ error: company.message })
  }
  return res.status(200).json(normalizeCompanies(company))
}
