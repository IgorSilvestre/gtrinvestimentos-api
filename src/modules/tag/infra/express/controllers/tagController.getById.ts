import { Request, Response } from 'express'
import { TagService } from '../../../service/tagService'
import { AppError } from '../../../../../shared/AppError'
import { ZTag } from '../../../interfaces-validation/ZTag'

export async function getById(req: Request, res: Response) {
  const { id } = req.params
  const tag: ZTag | AppError = await TagService.getById(id)
  if (tag instanceof AppError) {
    return res.status(tag.status).json({ error: tag.message })
  }

  return res.status(200).json(tag as ZTag)
}
