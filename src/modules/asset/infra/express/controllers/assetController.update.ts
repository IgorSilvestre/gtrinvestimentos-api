import { Request, Response } from 'express'
import { AppError } from '../../../../../shared/AppError'
import { AssetService } from '../../../service/AssetService'
import { ZAsset } from '../../../interfaces-validation/ZAsset'

export async function update(req: Request, res: Response) {
  const { id } = req.params
  try {
    const companyUpdateResult: ZAsset | AppError =
      await AssetService.update(id, req.body)

    if (companyUpdateResult instanceof AppError) {
      return res
        .status(companyUpdateResult.status)
        .json({ error: companyUpdateResult.message })
    }
    return res.status(200).json(companyUpdateResult as ZAsset)
  } catch (err) {
    return res.status(500).json(err)
  }
}
