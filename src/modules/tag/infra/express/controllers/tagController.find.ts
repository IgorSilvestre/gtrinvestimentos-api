import { Request, Response } from 'express'
import { TagService } from '../../../service/tagService'
import { AppError } from '../../../../../shared/AppError'
import { ZTag } from '../../../interfaces-validation/ZTag'
import { parseObjectWithRegex } from 'br-lib'

/**
 * needs stringify to use br-lib function stringifyObjectWithRegex
 */
export async function find(req: Request, res: Response) {
    const decoded = decodeURIComponent(req.query.search as string)
    let params = parseObjectWithRegex(decoded)
    console.log('params', params)

    const tags: ZTag[] | AppError = await TagService.find(params)
    if (tags instanceof AppError) {
        return res.status(tags.status).json({ error: tags.message })
    }

    return res.status(200).json(tags as ZTag[])
}

