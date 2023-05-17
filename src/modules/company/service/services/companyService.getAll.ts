import { CompanyRepository } from '../../infra/mongo/repository/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZCompanyModel } from '../../infra/mongo/companySchema'

export async function getAll (): Promise<ZCompanyModel[] | AppError> {
  try {
    const companies: ZCompanyModel[] | null = await CompanyRepository.getAll()

    if (companies === null) return new AppError(
      { clientMessage: errorMessageKeys.company.notFound },
      404)
    return companies as ZCompanyModel[]
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.company.notFound, apiError: err },
      404,
    )
  }
}
