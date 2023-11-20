import { DeleteResult } from 'mongodb'
import { TagRepository } from '../../infra/mongo/repository/TagRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { tagRebuildCache } from '../../../../shared/functions/cache/tagRebuildCache'

export async function remove(id: string): Promise<DeleteResult | AppError> {
  try {
    const tags = (await TagRepository.remove(id)) as DeleteResult

    const isCacheRebuilt = tagRebuildCache()
    if (!isCacheRebuilt) console.log(errorMessageKeys.tag.failedToRebuildCache)

    return tags
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.tag.notRemoved,
      apiError: err,
    })
  }
}
