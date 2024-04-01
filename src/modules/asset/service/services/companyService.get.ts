import { CompanyRepository } from '../../infra/mongo/repository/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { IPaginationParams } from '../../../../shared/interfaces/IPaginationsParams'
import { ICompaniesPaginated } from '../../interfaces-validation/ICompaniesPaginated'

export async function get(
  paginationParams: IPaginationParams,
): Promise<ICompaniesPaginated | AppError> {
  if (paginationParams?.page) {
    paginationParams.page = Number(paginationParams.page)
    paginationParams.page < 1 ? delete paginationParams.page : null
  }
  if (paginationParams?.limit) {
    paginationParams.limit = Number(paginationParams.limit)
    paginationParams.limit < 1 ? delete paginationParams.limit : null
  }

  try {
    const companies: ICompaniesPaginated | null = await CompanyRepository.get(
      paginationParams,
    )

    if (companies === null)
      return new AppError(
        { clientMessage: errorMessageKeys.company.notFound },
        404,
      )
    return companies
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.company.notFound, apiError: err },
      404,
    )
  }
}
