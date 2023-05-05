import { DeleteResult } from 'mongodb'
import { PersonRepository } from '../../infra/mongo/repository/PersonRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function remove (id: string): Promise<DeleteResult | AppError> {
  try {
    return await PersonRepository.remove(id) as DeleteResult
  } catch (err) {
    return new AppError({ clientMessage: errorMessageKeys.person.notRemoved, apiError: err })
  }
}
