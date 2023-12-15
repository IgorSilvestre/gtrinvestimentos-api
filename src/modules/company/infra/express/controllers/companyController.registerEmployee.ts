import { Request, Response } from 'express'
import { ZCompany } from '../../../interfaces-validation/ZCompany'
import { CompanyService } from '../../../service/companyService'
import { AppError } from '../../../../../shared/AppError'

export async function registerEmployee(req: Request, res: Response) {
  const { employeeId, companyId } = req.body

  if (typeof employeeId !== 'string') {
    return res.status(422).json('employeeId must be a string')
  }

  const isEmployeeRegistered = await CompanyService.registerEmployee(
    employeeId,
    companyId,
  )
  if (!isEmployeeRegistered) {
    return res.status(503).json('employeeId is not registered')
  }
  const company: ZCompany | AppError = await CompanyService.getById(companyId)

  if (company instanceof AppError) {
    return res.status(company.status).json({ error: company.message })
  }
  return res.status(201).json(company as ZCompany)
}
