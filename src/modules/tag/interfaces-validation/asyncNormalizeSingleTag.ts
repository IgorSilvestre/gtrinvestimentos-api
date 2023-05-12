import { IOption } from '../../../shared/interfaces/IOption'
import { IAppErrorMessage } from '../../../shared/interfaces/appError/IAppErrorMessage'
import { TagService } from '../service/tagService'
import { AppError } from '../../../shared/AppError'

export async function asyncNormalizeSingleTag (tagId: string): Promise<IOption | IAppErrorMessage> {
  const tag: any = await TagService.getById(tagId)
  if(tag instanceof AppError) return tag.message
  return { value: tag._id, label: tag.name }
}
