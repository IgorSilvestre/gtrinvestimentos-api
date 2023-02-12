import { Request, Response } from 'express'
import { CompanyService } from '../../CompanyService'
import {
  ZCompany,
  companyValidation,
} from '../../interfaces-validation/ZCompany'
import { AppError } from '../../../../shared/AppError'

export const CompanyController = {
  create: async (req: Request, res: Response) => {
    const companyDTO = req.body as ZCompany

    const validatedCompanyDTO = companyValidation.safeParse(companyDTO)
    if (!validatedCompanyDTO.success) {
      return res.status(400).json(validatedCompanyDTO.error.errors)
    }

    const company = await CompanyService.store(companyDTO)
    if (company instanceof AppError) {
      return res.status(company.status).json({ error: company.message })
    }

    return res.status(200).json(company)
  },

  getById: async (req: Request, res: Response) => {
    const { id } = req.params
    const company = await CompanyService.getById(id)
    if (company instanceof AppError) {
      return res.status(company.status).json({ error: company.message })
    }

    return res.status(200).json(company)
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params
    const {data} = req.body
    // TO CHECK IF EXISTS, USING findAndUpdate NOW - SO NO NEED FOR THIS
    // const validatedCompanyDTO = companyValidation.safeParse(data)
    // if (!validatedCompanyDTO.success) {
    //   return res.status(400).send(validatedCompanyDTO.error.errors)
    // }
    try {
      const companyUpdateResult = await CompanyService.update({ id, data })

      if (companyUpdateResult instanceof AppError) {
        return res.status(companyUpdateResult.status).json({ error: companyUpdateResult.message });
      }

      return res.status(200).json(companyUpdateResult)
    } catch (err) {
        return res.status(500).json(err)
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await CompanyService.delete(id)

    if (result instanceof AppError) return res.status(result.status).json({ error: result.message });
    console.log(result)
    return res.status(204).json(result)
  }
}
