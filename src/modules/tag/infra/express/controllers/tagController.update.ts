import { Request, Response } from 'express'
import { TagService } from '../../../service/tagService'
import { AppError } from '../../../../../shared/AppError'
import { ZTag } from '../../../interfaces-validation/ZTag'

export async function update(req: Request, res: Response) {
  const { id } = req.params
  try {
    const tagUpdateResult: ZTag | AppError = await TagService.update(
      id,
      req.body,
    )

    if (tagUpdateResult instanceof AppError) {
      return res
        .status(tagUpdateResult.status)
        .json({ error: tagUpdateResult.message })
    }
    return res.status(200).json(tagUpdateResult as ZTag)
  } catch (err) {
    return res.status(500).json(err)
  }
}
