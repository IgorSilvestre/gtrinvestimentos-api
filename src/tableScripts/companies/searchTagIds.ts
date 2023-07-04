import { ZTag } from '../../modules/tag/interfaces-validation/ZTag'
import { TagService } from '../../modules/tag/service/tagService'
import { AppError } from '../../shared/AppError'
import { testRegexForSearch } from '../../shared/functions/testRegexForSearch'

export async function searchTagIds(
  listOfTagLabels: string[],
): Promise<string[] | AppError> {
  if (!Array.isArray(listOfTagLabels)) return []

  let tags: ZTag[] | AppError

  try {
    tags = await TagService.getAll()
    if (tags instanceof AppError)
      return new AppError({
        apiError: 'Error on >> searchTagIds: failed to get tags from database',
      })
  } catch (err) {
    return new AppError({ apiError: err })
  }

  const tagIDs: string[] = []

  tags.flatMap((tag: ZTag) =>
    listOfTagLabels.flatMap((tagName) => {
      if (testRegexForSearch(tagName, tag.label)) {
        if (!tagIDs.includes(tag._id)) {
          tagIDs.push(tag._id)
        }
      }
    }),
  )
  return tagIDs
}
