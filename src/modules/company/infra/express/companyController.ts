import { Request, Response } from 'express'
import { CompanyService } from '../../CompanyService'
import { ZCompany, companyValidation } from '../../interfaces-validation/ZCompany'
import { AppError } from '../../../../shared/AppError'

export const CompanyController = {
  create: async (req: Request, res: Response) => {
    const companyDTO = req.body as ZCompany

    const validatedCompanyDTO = companyValidation.safeParse(companyDTO)
    if (!validatedCompanyDTO.success) {
      return res.status(400).send(validatedCompanyDTO.error.errors)
    }

    const company = await CompanyService.store(companyDTO)
    if (company instanceof AppError) {
      return res.status(company.status).json({ error: company.message })
    }

    return res.status(200).send(company)
  },

  //   update: async (req: Request, res: Response) => {
  //     const { id } = req.params
  //     const {data} = req.body

  //     const validatedCompanyDTO = companyValidation.safeParse(data)
  //     if (!validatedCompanyDTO.success) {
  //       return res.status(400).send(validatedCompanyDTO.error.errors)
  //     }

  //     try {
  //       const company = await CompanyService.update({ id, data })

  //       if (company instanceof AppError) {
  //         return res.status(company.status).json({ error: company.message });
  //       }

  //       return res.status(200).send(company)
  //     } catch (err) {
  //         return res.status(500).send(err)
  //     }
  //   },
}
