import { IOption } from "../interfaces/IOption"

export interface IDatabaseOption {
    _id: string
    label: string
}

export function normalizeTags(tags: IDatabaseOption | IDatabaseOption[]): IOption[] {
  // TODO pass this normalization to the frontend
  if (!tags) return []
  tags = Array.isArray(tags) ? tags : [tags]
  return tags.map(
    (tag: IDatabaseOption) => ({ value: tag._id, label: tag.label } as IOption),
  )
}
