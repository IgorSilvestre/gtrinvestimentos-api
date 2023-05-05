import { ZTag } from '../../interfaces-validation/ZTag'
import { TagRepository } from '../../infra/mongo/repository/TagRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function update (id: string, tagUpdatedData: ZTag): Promise<ZTag | AppError> {
  try {
    const tag: ZTag | null = await TagRepository.update(id, tagUpdatedData)

    if (tag === null) return new AppError({ clientMessage: 'returned: NULL' })
    return tag as ZTag
  } catch (err) {
    return new AppError({ clientMessage: errorMessageKeys.tag.notUpdated, apiError: err })
  }
}
