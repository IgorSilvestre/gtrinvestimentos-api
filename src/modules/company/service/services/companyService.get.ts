import { CompanyRepository } from '../../infra/mongo/repository/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { IPaginationParams } from '../../../../shared/interfaces/IPaginationsParams'
import { ICompanyDocument } from '../../interfaces-validation/ICompanyModel'

export async function get(
  paginationParams: IPaginationParams,
): Promise<ICompanyDocument[] | AppError> {
  try {
    const companies: ICompanyDocument[] | null =
      await CompanyRepository.get(paginationParams)

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
