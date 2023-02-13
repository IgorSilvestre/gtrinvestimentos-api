import { Request, Response } from 'express'
import { CompanyService } from '../../../service/companyService'
import { AppError } from '../../../../../shared/AppError'

export async function update (req: Request, res: Response) {
  const { id } = req.params
  const {data} = req.body
  try {
    const companyUpdateResult = await CompanyService.update(id, data)

    if (companyUpdateResult instanceof AppError) {
      return res.status(companyUpdateResult.status).json({ error: companyUpdateResult.message });
    }

    return res.status(200).json(companyUpdateResult)
  } catch (err) {
    return res.status(500).json(err)
  }
}