import { TagRepository } from '../../infra/mongo/repository/TagRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZTag } from '../../interfaces-validation/ZTag'
import { CACHE } from '../../../../shared/cache'
import { cacheKeys } from '../../../../shared/keys/cacheKeys'

export async function getAll (): Promise<ZTag[] | AppError> {
  const cachedData = CACHE.get(cacheKeys.tag.all)
  if (cachedData) return cachedData as ZTag[]

  try {
    const tags: ZTag[] | null = await TagRepository.getAll()

    if (tags === null) return new AppError(
      { clientMessage: errorMessageKeys.tag.notFound },
      404)
    
    CACHE.set(cacheKeys.tag.all, tags)
    return tags as ZTag[]
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.tag.notFound, apiError: err },
      404,
    )
  }
}
