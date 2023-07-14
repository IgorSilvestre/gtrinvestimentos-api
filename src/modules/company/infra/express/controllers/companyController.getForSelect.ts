import { Request, Response } from "express"
import { AppError } from "../../../../../shared/AppError"
import { ZCompany } from "../../../interfaces-validation/ZCompany"
import { CompanyService } from "../../../service/companyService"
import { parseCompaniesForSelect } from "../../../interfaces-validation/parseCompaniesForSelect"
import { IOption } from "../../../../../shared/interfaces/IOption"

export async function getAllForSelect (req: Request, res: Response) {
  const companies: ZCompany[] | AppError = await CompanyService.getAll()
  if (companies instanceof AppError) {
    return res.status(companies.status).json({ error: companies.message })
  }

  return res.status(200).json(parseCompaniesForSelect(companies) as IOption[])
}