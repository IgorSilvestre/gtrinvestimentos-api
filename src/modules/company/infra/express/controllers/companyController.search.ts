import { Request, Response } from 'express'
import { AppError } from '../../../../../shared/AppError'
import { CompanyService } from '../../../service/companyService'
import { normalizeCompanies } from '../../../interfaces-validation/normalizeCompanies'
import { ICompanyDocument } from '../../../interfaces-validation/ICompanyModel'

export async function search(req: Request, res: Response) {
  console.log('controller', req.query)
  const companies: ICompanyDocument[] | AppError = await CompanyService.search(
    req.query,
  )
  if (companies instanceof AppError) {
    return res.status(companies.status).json({ error: companies.message })
  }
  return res.status(200).json(normalizeCompanies(companies))
}
