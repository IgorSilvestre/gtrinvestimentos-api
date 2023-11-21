import { Request, Response } from 'express'
import { externalAPIService } from '../../../service/externalAPIService'
import { AppError } from '../../../../../shared/AppError'

export async function deepSearchCompany(req: Request, res: Response) {
  const { domain } = req.params

  if (!domain) {
    return res.status(400).json({ error: 'No url provided' })
  }

  let deepSearchData = await externalAPIService.deepSearchCompany(domain)

  if (deepSearchData instanceof AppError) {
    res.status(deepSearchData.status).json(deepSearchData.message)
  }

  res.status(200).json(deepSearchData)
}
