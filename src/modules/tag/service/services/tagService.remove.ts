import { DeleteResult } from 'mongodb'
import { TagRepository } from '../../infra/mongo/repository/TagRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function remove (id: string): Promise<DeleteResult | AppError> {
  try {
    return await TagRepository.remove(id) as DeleteResult
  } catch (err) {
    return new AppError({ clientMessage: errorMessageKeys.tag.notRemoved, apiError: err })
  }
}
