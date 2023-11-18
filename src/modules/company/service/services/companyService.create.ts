import {
  ZCompany,
  companyValidation,
} from '../../interfaces-validation/ZCompany'
import { CompanyRepository } from '../../infra/mongo/repository/CompanyRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function create(
  companyDTO: ZCompany,
): Promise<ZCompany | AppError> {
  const validatedCompanyDTO = companyValidation.safeParse(companyDTO)
  if (!validatedCompanyDTO.success)
    return new AppError(
      { clientMessage: validatedCompanyDTO.error.errors },
      400,
    )

  try {
    const alreadyExists = await CompanyRepository.search(
      {
        query: companyDTO.name,
        isFullMatch: true
      }
    )
    if (alreadyExists instanceof Error) return new AppError({ apiError: alreadyExists, clientMessage: errorMessageKeys.checkIfExistsFailed })
    if (alreadyExists && alreadyExists?.data?.length > 0)
      return new AppError(
        { clientMessage: errorMessageKeys.alreadyExists },
        409,
      )
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.checkIfExistsFailed,
      apiError: err,
    })
  }

  try {
    return (await CompanyRepository.create(companyDTO)) as ZCompany
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.company.notCreated,
      apiError: err,
    })
  }
}
