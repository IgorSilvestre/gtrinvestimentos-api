import { CompanyRepository } from '../../infra/mongo/repository/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZCompanyModel } from '../../infra/mongo/companySchema'

export async function getById (id: string): Promise<ZCompanyModel | AppError> {
  try {
    const company: ZCompanyModel | null = await CompanyRepository.getById(id)

    if (company === null) return new AppError(
      { clientMessage: errorMessageKeys.company.notFound },
      404)
    return company as ZCompanyModel
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.company.notFound, apiError: err },
      404,
    )
  }
}
