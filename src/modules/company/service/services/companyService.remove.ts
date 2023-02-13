import { DeleteResult } from 'mongodb'
import { CompanyRepository } from '../../infra/mongo/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function remove (id: string): Promise<DeleteResult | AppError> {
  try {
    return await CompanyRepository.remove(id) as DeleteResult
  } catch (err) {
    return new AppError({ clientMessage: errorMessageKeys.company.notRemoved, apiError: err })
  }
}