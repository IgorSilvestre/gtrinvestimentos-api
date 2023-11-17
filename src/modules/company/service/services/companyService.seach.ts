import { CompanyRepository } from '../../infra/mongo/repository/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ISearchParams } from '../../../../shared/interfaces/ISearchParams'
import { ICompanyDocument } from '../../interfaces-validation/ICompanyModel'
import { ICompaniesPaginated } from '../../interfaces-validation/ICompaniesPaginated'
import { ensureArray } from '../../../../shared/functions/ensureArray'

export async function search(
  searchParams: ISearchParams,
): Promise<ICompaniesPaginated | AppError> {
  if (searchParams?.page) {
    searchParams.page = Number(searchParams.page)
    searchParams.page < 1 ? delete searchParams.page : null
  }
  if(searchParams?.limit) {
    searchParams.limit = Number(searchParams.limit)
    searchParams.limit < 1 ? delete searchParams.limit : null
  }

  try {
    const companies: ICompaniesPaginated | null | Error =
      await CompanyRepository.search(searchParams)

    if (companies === null)
      return new AppError(
        { clientMessage: errorMessageKeys.company.notFound },
        404,
      )

    if (companies instanceof Error)
      return new AppError({ apiError: companies, clientMessage: errorMessageKeys.company.cantGetCompany }, 503)

    return companies
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.company.notFound, apiError: err },
      404,
    )
  }
}
