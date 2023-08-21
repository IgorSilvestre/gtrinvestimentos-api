import { CompanyRepository } from '../../infra/mongo/repository/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZCompanyModel } from '../../infra/mongo/companySchema'
import { ISearchParams } from '../../../../shared/interfaces/ISearchParams'

export async function search (searchParams: ISearchParams): Promise<ZCompanyModel[] | AppError> {
  let {isFullMatch} = searchParams
  if (isFullMatch) delete searchParams.isFullMatch

  try {
    const companies: ZCompanyModel[] | null = await CompanyRepository.search(searchParams, isFullMatch)

    if (companies === null) return new AppError(
      { clientMessage: errorMessageKeys.company.notFound },
      404)
    return companies
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.company.notFound, apiError: err },
      404,
    )
  }
}
