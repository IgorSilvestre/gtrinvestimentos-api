import { ZTag } from '../../interfaces-validation/ZTag'
import { TagRepository } from '../../infra/mongo/repository/TagRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { tagRebuildCache } from '../../../../shared/functions/cache/tagRebuildCache'

export async function create(tagDTO: ZTag): Promise<ZTag | AppError> {
  try {
    const tags = (await TagRepository.create(tagDTO)) as ZTag

    const isCacheRebuilt = tagRebuildCache()
    if (!isCacheRebuilt) console.log(errorMessageKeys.tag.failedToRebuildCache)

    return tags
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.tag.notCreated,
      apiError: err,
    })
  }
}
