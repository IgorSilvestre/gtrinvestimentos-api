import { Request, Response } from 'express'
import { tagValidation, ZTag } from '../../../interfaces-validation/ZTag'
import { TagService } from '../../../service/tagService'
import { AppError } from '../../../../../shared/AppError'

export async function create(req: Request, res: Response) {
  const tagDTO = req.body as ZTag

  const validatedTagDTO = tagValidation.safeParse(tagDTO)
  if (!validatedTagDTO.success) {
    return res.status(400).json(validatedTagDTO.error.errors)
  }

  const tag: ZTag | AppError = await TagService.create(tagDTO)

  if (tag instanceof AppError) {
    return res.status(tag.status).json({ error: tag.message })
  }
  return res.status(200).json(tag as ZTag)
}
