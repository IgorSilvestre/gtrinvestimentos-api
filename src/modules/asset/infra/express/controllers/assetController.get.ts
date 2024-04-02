import { Request, Response } from 'express'
import { AssetService } from '../../../service/AssetService'
import { AppError } from '../../../../../shared/AppError'
import { IAssetPagination } from '../../../interfaces-validation/IAssetDocument'

export async function get(req: Request, res: Response) {
  const { page, limit } = req.query
  const search = JSON.parse(decodeURIComponent(req.query.search as string))

  const assets: IAssetPagination | AppError = await AssetService.get(
    search,
    parseInt(limit as string) || undefined,
    parseInt(page as string) || undefined,
  )

  if (assets instanceof AppError) {
    return res.status(assets.status).json({ error: assets.message })
  }
  return res.status(200).json(assets)
}
