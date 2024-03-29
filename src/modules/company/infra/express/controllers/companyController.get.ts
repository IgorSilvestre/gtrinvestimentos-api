import { Request, Response } from 'express'
import { AppError } from '../../../../../shared/AppError'
import { CompanyService } from '../../../service/companyService'
import { normalizeCompanies } from '../../../interfaces-validation/normalizeCompanies'
import { ICompaniesPaginated } from '../../../interfaces-validation/ICompaniesPaginated'

export async function get(req: Request, res: Response) {
  const companies: ICompaniesPaginated | AppError = await CompanyService.get(
    req.query,
  )
  if (companies instanceof AppError) {
    return res.status(companies.status).json({ error: companies.message })
  }
  return res.status(200).json({
    ...companies,
    data: normalizeCompanies(companies.data),
  })
}
