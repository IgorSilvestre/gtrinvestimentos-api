import { ZTag } from '../../interfaces-validation/ZTag'
import { TagRepository } from '../../infra/mongo/repository/TagRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function create (tagDTO: ZTag): Promise<ZTag | AppError> {
  try {
    return await TagRepository.create(tagDTO) as ZTag
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.tag.notCreated,
      apiError: err,
    })
  }
}
