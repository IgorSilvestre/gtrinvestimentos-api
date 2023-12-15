import { TagRepository } from '../../infra/mongo/repository/TagRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZTag } from '../../interfaces-validation/ZTag'

export async function getById(id: string): Promise<ZTag | AppError> {
  try {
    const tag: ZTag | null = await TagRepository.getById(id)

    if (tag === null)
      return new AppError({ clientMessage: errorMessageKeys.tag.notFound }, 404)
    return tag as ZTag
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.tag.notFound, apiError: err },
      404,
    )
  }
}
