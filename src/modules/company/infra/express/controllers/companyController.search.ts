import { Request, Response } from 'express'
import { AppError } from '../../../../../shared/AppError'
import { CompanyService } from '../../../service/companyService'
import { normalizeCompanies } from '../../../interfaces-validation/normalizeCompanies'
import { ICompaniesPaginated } from '../../../interfaces-validation/ICompaniesPaginated'

export async function search(req: Request, res: Response) {
    if(req.query.tags && typeof req.query.tags === 'string' && req.query.tags.includes(','))
        req.query.tags = req.query.tags.split(',')

  const companies: ICompaniesPaginated | AppError = await CompanyService.search(
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
