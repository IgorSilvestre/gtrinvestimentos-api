import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { CompanyRepository } from '../../infra/mongo/repository/CompanyRepository'

export async function addToSet(id: string, data: {}) {
  try {
    return CompanyRepository.addToSet(id, data)
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.company.notUpdated,
      apiError: 'SERVICE: addToSet -- ' + err,
    })
  }
}
