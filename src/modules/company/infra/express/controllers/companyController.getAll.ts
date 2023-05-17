import { Request, Response } from 'express'
import { ZCompanyModel } from '../../mongo/companySchema'
import { AppError } from '../../../../../shared/AppError'
import { CompanyService } from '../../../service/companyService'
import { normalizeCompanies } from '../../../interfaces-validation/normalizeCompanies'

export async function getAll (req: Request, res: Response) {
  const companies: ZCompanyModel[] | AppError = await CompanyService.getAll()
  if (companies instanceof AppError) {
    return res.status(companies.status).json({ error: companies.message })
  }
  return res.status(200).json(normalizeCompanies(companies))
}
