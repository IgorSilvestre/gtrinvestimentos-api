import { Request, Response } from 'express'
import { CompanyService } from '../../../service/companyService'
import { AppError } from '../../../../../shared/AppError'
import { ZCompany } from '../../../interfaces-validation/ZCompany'

export async function update (req: Request, res: Response) {
  const { id } = req.params
  try {
    const companyUpdateResult: ZCompany | AppError = await CompanyService.update(id, req.body)

    if (companyUpdateResult instanceof AppError) {
      return res.status(companyUpdateResult.status).json({ error: companyUpdateResult.message });
    }
    return res.status(200).json(companyUpdateResult as ZCompany)
  } catch (err) {
    return res.status(500).json(err)
  }
}
