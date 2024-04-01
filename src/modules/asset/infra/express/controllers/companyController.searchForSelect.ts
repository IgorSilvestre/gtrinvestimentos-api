import { Request, Response } from 'express'
import { AppError } from '../../../../../shared/AppError'
import { CompanyService } from '../../../service/companyService'
import { IOption } from '../../../../../shared/interfaces/IOption'

export async function searchForSelect(req: Request, res: Response) {
  const companies: IOption[] | AppError = await CompanyService.searchForSelect(
    req.query,
  )
  if (companies instanceof AppError) {
    return res.status(companies.status).json({ error: companies.message })
  }

  return res.status(200).json(companies)
}
