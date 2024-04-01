import { Request, Response } from 'express'
import {
  companyValidation,
  ZCompany,
} from '../../../interfaces-validation/ZCompany'
import { CompanyService } from '../../../service/companyService'
import { AppError } from '../../../../../shared/AppError'

export async function create(req: Request, res: Response) {
  const companyDTO = req.body as ZCompany

  const validatedCompanyDTO = companyValidation.safeParse(companyDTO)
  if (!validatedCompanyDTO.success) {
    return res.status(422).json(validatedCompanyDTO.error.errors)
  }

  const company: ZCompany | AppError = await CompanyService.create(companyDTO)

  if (company instanceof AppError) {
    return res.status(company.status).json({ error: company.message })
  }
  return res.status(201).json(company as ZCompany)
}
