import { Request, Response } from 'express'
import { TagService } from '../../../service/tagService'
import { AppError } from '../../../../../shared/AppError'
import { ZTag } from '../../../interfaces-validation/ZTag'
import { normalizeTags } from '../../../interfaces-validation/normalizeTags'
import { IOption } from '../../../../../shared/interfaces/IOption'

export async function getForSelect(req: Request, res: Response) {
  const tags: ZTag[] | AppError = await TagService.getAll()
  if (tags instanceof AppError) {
    return res.status(tags.status).json({ error: tags.message })
  }

  return res.status(200).json(normalizeTags(tags) as IOption[])
}
