import { CompanyRepository } from '../../infra/mongo/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function getById (id: string): Promise<any> {
  try {
    const company = await CompanyRepository.getById(id)
    if (company === null) return new AppError(
      { clientMessage: errorMessageKeys.company.notFound },
      404)
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.company.notFound, apiError: err },
      404,
    )
  }
}