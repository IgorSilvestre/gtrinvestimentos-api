import { ZCompany } from '../../interfaces-validation/ZCompany'
import { IAppError } from '../../../../shared/interfaces/appError/IAppError'
import { CompanyRepository } from '../../infra/mongo/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function create (companyDTO: ZCompany): Promise<ZCompany | IAppError> {
  try {
    return await CompanyRepository.create(companyDTO)
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.company.notCreated,
      apiError: err,
    })
  }
}