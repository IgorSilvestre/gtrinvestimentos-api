import { Request, Response } from 'express'
import {
  assetValidation,
  ZAsset,
} from '../../../interfaces-validation/ZAsset'
import { AssetService } from '../../../service/AssetService'
import { AppError } from '../../../../../shared/AppError'

export async function create(req: Request, res: Response) {
  const assetDTO = req.body as ZAsset

  const validatedAssetDTO = assetValidation.safeParse(assetDTO)
  if (!validatedAssetDTO.success) {
    return res.status(422).json(validatedAssetDTO.error.errors)
  }

  const asset: ZAsset | AppError = await AssetService.create(assetDTO)

  if (asset instanceof AppError) {
    return res.status(asset.status).json({ error: asset.message })
  }
  return res.status(201).json(asset as ZAsset)
}
