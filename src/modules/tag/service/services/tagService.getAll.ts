import { TagRepository } from '../../infra/mongo/repository/TagRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZTag } from '../../interfaces-validation/ZTag'

export async function getAll (): Promise<ZTag[] | AppError> {
  try {
    const tags: ZTag[] | null = await TagRepository.getAll()

    if (tags === null) return new AppError(
      { clientMessage: errorMessageKeys.tag.notFound },
      404)
    return tags as ZTag[]
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.tag.notFound, apiError: err },
      404,
    )
  }
}
