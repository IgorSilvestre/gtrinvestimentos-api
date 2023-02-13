import { CompanyRepository } from '../../infra/mongo/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZCompany } from '../../interfaces-validation/ZCompany'

export async function getById (id: string): Promise<ZCompany | AppError> {
  try {
    const company: ZCompany | null = await CompanyRepository.getById(id)

    if (company === null) return new AppError(
      { clientMessage: errorMessageKeys.company.notFound },
      404)
    return company as ZCompany
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.company.notFound, apiError: err },
      404,
    )
  }
}