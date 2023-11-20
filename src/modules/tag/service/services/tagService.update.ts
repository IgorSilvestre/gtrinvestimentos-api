import { ZTag } from '../../interfaces-validation/ZTag'
import { TagRepository } from '../../infra/mongo/repository/TagRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { tagRebuildCache } from '../../../../shared/functions/cache/tagRebuildCache'

export async function update(
  id: string,
  tagUpdatedData: ZTag,
): Promise<ZTag | AppError> {
  try {
    const tag: ZTag | null = await TagRepository.update(id, tagUpdatedData)

    if (tag === null) return new AppError({ clientMessage: 'returned: NULL' })

    const isCacheRebuilt = tagRebuildCache()
    if (!isCacheRebuilt) console.log(errorMessageKeys.tag.failedToRebuildCache)

    return tag as ZTag
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.tag.notUpdated,
      apiError: err,
    })
  }
}
