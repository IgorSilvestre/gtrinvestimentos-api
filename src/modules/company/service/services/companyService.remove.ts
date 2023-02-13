import { DeleteResult } from 'mongodb'
import { IAppError } from '../../../../shared/interfaces/appError/IAppError'
import { CompanyRepository } from '../../infra/mongo/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function remove (id: string): Promise<DeleteResult | IAppError> {
  try {
    return await CompanyRepository.remove(id)
  } catch (err) {
    return new AppError({ clientMessage: errorMessageKeys.company.notRemoved, apiError: err })
  }
}