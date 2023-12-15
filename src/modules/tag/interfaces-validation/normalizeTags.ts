import { ZTag } from './ZTag'
import { IOption } from '../../../shared/interfaces/IOption'

export function normalizeTags(tags: ZTag | ZTag[]): IOption[] {
  // TODO pass this normalization to the frontend
  if (!tags) return []
  tags = Array.isArray(tags) ? tags : [tags]
  return tags.map(
    (tag: ZTag) => ({ value: tag._id, label: tag.label } as IOption),
  )
}
