import { Request, Response } from 'express'
import { externalAPIService } from '../../../service/externalAPIService'
import { ICompanyLinkedinData } from '../../../service/services/fetchLinkedinCompanyDataByDomain.externalAPIService'
import { AppError } from '../../../../../shared/AppError'

export async function fetchLinkedinCompanyDataByDomain(
  req: Request,
  res: Response,
) {
  const { domain } = req.params
  const companyLinkedinData: ICompanyLinkedinData | AppError =
    await externalAPIService.fetchLinkedinCompanyDataByDomain(domain as string)

  if (companyLinkedinData instanceof AppError)
    return res
      .status(companyLinkedinData.status)
      .json({ error: companyLinkedinData.message })

  return res.status(200).json(companyLinkedinData.results)
}
