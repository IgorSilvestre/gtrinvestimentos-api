import { ZCompany } from '../../interfaces-validation/ZCompany'
import { CompanyRepository } from '../../infra/mongo/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function create (companyDTO: ZCompany): Promise<ZCompany | AppError> {
  try {
    return await CompanyRepository.create(companyDTO) as ZCompany
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.company.notCreated,
      apiError: err,
    })
  }
}