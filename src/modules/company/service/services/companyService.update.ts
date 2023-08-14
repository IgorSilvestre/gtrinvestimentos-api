import { ZCompany } from '../../interfaces-validation/ZCompany'
import { CompanyRepository } from '../../infra/mongo/repository/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function update (id: string, companyUpdatedData: {}): Promise<ZCompany | AppError> {
  try {
    const company: ZCompany | null = await CompanyRepository.update(id, companyUpdatedData)

    if (company === null) return new AppError({ clientMessage: 'returned: NULL' })
    return company as ZCompany
  } catch (err) {
    return new AppError({ clientMessage: errorMessageKeys.company.notUpdated, apiError: err })
  }
}
