import { ZCompany } from '../../interfaces-validation/ZCompany'
import { CompanyRepository } from '../../infra/mongo/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function update (id: string, data: ZCompany): Promise<ZCompany | AppError> {
  // update company data
  try {
    const company: ZCompany | null = await CompanyRepository.update(id, data)

    if (company === null) return new AppError({ clientMessage: 'returned: NULL' })
    return company as ZCompany
  } catch (err) {
    return new AppError({ clientMessage: errorMessageKeys.company.notUpdated, apiError: err })
  }
}