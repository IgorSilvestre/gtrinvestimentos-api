import { Request, Response } from 'express'
import { AssetService } from '../../../service/AssetService'
import { AppError } from '../../../../../shared/AppError'
import { IAssetPagination } from '../../../interfaces-validation/IAssetDocument'
import { errorMessageKeys } from '../../../../../shared/keys/errorMessageKeys'

export async function get(req: Request, res: Response) {
  const { page, limit } = req.query
  
  let search
  try {
    search = req.query.search ? JSON.parse(decodeURIComponent(req.query.search as string)) : {}
  } catch (err) {
    search = {}
    console.log({ error: err, clientMessage: errorMessageKeys.badSearchParams })
  }

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
