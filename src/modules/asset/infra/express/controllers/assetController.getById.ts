import { Request, Response } from 'express'
import { IAssetDocument } from '../../../interfaces-validation/IAssetDocument'
import { AppError } from '../../../../../shared/AppError'
import { AssetService } from '../../../service/AssetService'
import { normalizeAssets } from '../../../interfaces-validation/normalizeAsset'

export async function getById(req: Request, res: Response) {
  const { id } = req.params
  const asset: IAssetDocument | AppError = await AssetService.getById(id)
  if (asset instanceof AppError) {
    return res.status(asset.status).json({ error: asset.message })
  }
  return res.status(200).json(normalizeAssets(asset))
}

