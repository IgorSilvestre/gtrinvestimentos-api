import { Request, Response } from 'express'
import { AppError } from '../../../../../shared/AppError'
import { AssetService } from '../../../service/AssetService'
import { IAssetPagination } from '../../../interfaces-validation/IAssetDocument'
import { convertBase64ToObject } from '../../../../../shared/functions/convertbase64ToObject'

export async function search(req: Request, res: Response) {
    console.log('req.query.query', req.query.query)
    if (!req.query.query)
      return res.status(204).json({ warning: 'No query provided' })

    const params = convertBase64ToObject(req.query.query as string)
    console.log('params', params)

    const assets: IAssetPagination | AppError = await AssetService.search(
        convertBase64ToObject(req.query.query as string),
    )

    if (assets instanceof AppError) {
        return res.status(assets.status).json({ error: assets.message })
    }

    return res.status(200).json(assets)
}
