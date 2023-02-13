import { ZCompany } from '../../interfaces-validation/ZCompany'
import { IAppError } from '../../../../shared/interfaces/appError/IAppError'
import { CompanyRepository } from '../../infra/mongo/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function update (id: string, data: ZCompany): Promise<ZCompany | IAppError> {
  // update company data
  try {
    const company = await CompanyRepository.update(id, data)
    if (company === null) return new AppError({ clientMessage: 'returned: NULL' })
    return company
  } catch (err) {
    return new AppError({ clientMessage: errorMessageKeys.company.notUpdated, apiError: err })
  }
}