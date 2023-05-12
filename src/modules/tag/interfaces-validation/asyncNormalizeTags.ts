import { TagService } from '../service/tagService'
import { AppError } from '../../../shared/AppError'
import { IOption } from '../../../shared/interfaces/IOption'
import { IAppErrorMessage } from '../../../shared/interfaces/appError/IAppErrorMessage'

export async function asyncNormalizeTags (tags: string[] | undefined): Promise<Awaited<IAppErrorMessage | IOption>[]> {
  if (!tags) return []
  const tagPromises = tags.map(async (tagId) => {
    const tag = await TagService.getById(tagId)
    if(tag instanceof AppError) return tag.message as IAppErrorMessage
    return { value: tag._id, label: tag.name } as IOption
  })
  return Promise.all(tagPromises)
}
