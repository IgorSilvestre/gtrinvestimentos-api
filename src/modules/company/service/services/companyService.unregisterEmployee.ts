import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { CompanyRepository } from '../../infra/mongo/repository/CompanyRepository'

export async function unregisterEmployee(
  employeeId: string,
  companyId: string,
): Promise<true | AppError> {
  try {
    await CompanyRepository.updateWithPull(companyId, { employees: employeeId })
    return true
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.company.cantUnregisterEmployee,
      apiError: err,
    })
  }
}
