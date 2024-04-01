import { CompanyRepository } from '../../infra/mongo/repository/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ICompanyDocument } from '../../interfaces-validation/ICompanyModel'

export async function getById(
  id: string,
): Promise<ICompanyDocument | AppError> {
  try {
    const company: ICompanyDocument | null = await CompanyRepository.getById(id)

    if (company === null)
      return new AppError(
        { clientMessage: errorMessageKeys.company.notFound },
        404,
      )
    return company as ICompanyDocument
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.company.notFound, apiError: err },
      404,
    )
  }
}
