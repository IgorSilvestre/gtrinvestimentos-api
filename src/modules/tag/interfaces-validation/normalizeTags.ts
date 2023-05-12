import { ZTag } from './ZTag'
import { IOption } from '../../../shared/interfaces/IOption'

export function normalizeTags (tags: ZTag[]): IOption[] {
  if (!tags) return []
  return tags.map((tag) => ({ value: tag._id, label: tag.name } as IOption))
}
