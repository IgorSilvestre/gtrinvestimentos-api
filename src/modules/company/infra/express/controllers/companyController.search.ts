import { Request, Response } from 'express'
import { ZCompanyModel } from '../../mongo/companySchema'
import { AppError } from '../../../../../shared/AppError'
import { CompanyService } from '../../../service/companyService'
import { normalizeCompanies } from '../../../interfaces-validation/normalizeCompanies'

export async function search (req: Request, res: Response) {
  console.log('controller', req.query)
  const companies: ZCompanyModel[] | AppError = await CompanyService.search(req.query)
  if (companies instanceof AppError) {
    return res.status(companies.status).json({ error: companies.message })
  }
  return res.status(200).json(normalizeCompanies(companies))
}
