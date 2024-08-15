import { Request, Response } from 'express'
import { AppError } from '../../../../../shared/AppError'
import { AssetService } from '../../../service/AssetService'
import { IAssetPagination } from '../../../interfaces-validation/IAssetDocument'

export async function search(req: Request, res: Response) {
    if (req.query.tags && typeof req.query.tags === 'string' && req.query.tags.includes(','))
        req.query.tags = req.query.tags.split(',')

    const assets: IAssetPagination | AppError = await AssetService.search(
        req.query,
    )

    if (assets instanceof AppError) {
        return res.status(assets.status).json({ error: assets.message })
    }

    return res.status(200).json(assets)
}
