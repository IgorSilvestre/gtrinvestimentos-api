import { Request, Response } from 'express'
import { externalAPIService } from '../../../service/externalAPIService'
import { AppError } from '../../../../../shared/AppError'

interface IService {
  name: string
  domain: string
}

export async function fetchBusinessEmail(req: Request, res: Response) {
  const { domain, name } = req.query
  
  if (!domain) {
    return res.status(400).json({ error: 'No domain provided' })
  }

  if (!name) {
    return res.status(400).json({ error: 'No name provided' })
  }

  try {
    const businessEmailData = await externalAPIService.fetchBusinessEmail({
      domain,
      name,
    } as IService)

    if (businessEmailData instanceof AppError) {
      return res.status(businessEmailData.status).json(businessEmailData.message)
    }

    res.status(200).json(businessEmailData)
  } catch (error) {
    res.status(500).json(error)
  }
}
