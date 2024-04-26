import { TagRepository } from '../../infra/mongo/repository/TagRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZTag } from '../../interfaces-validation/ZTag'
import { CACHE } from '../../../../shared/cache'

export async function find(params: any): Promise<ZTag[] | AppError> {
    const cacheKey = `tag-find-${JSON.stringify(params)}`
    const cachedData = CACHE.get(cacheKey)

    if (cachedData) return cachedData as ZTag[]

    try {
        const tags: ZTag[] | null = await TagRepository.find(params)

        if (tags === null)
            return new AppError({ clientMessage: errorMessageKeys.tag.notFound }, 404)

        CACHE.set(cacheKey, tags)
        return tags as ZTag[]
    } catch (err) {
        return new AppError(
            { clientMessage: errorMessageKeys.tag.notFound, apiError: err },
            404,
        )
    }
}
