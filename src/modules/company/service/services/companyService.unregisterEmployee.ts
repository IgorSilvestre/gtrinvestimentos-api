import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZCompany } from '../../interfaces-validation/ZCompany'
import { CompanyService } from '../companyService'

export async function unregisterEmployee(
  employeeId: string,
  companyId: string,
): Promise<true | AppError> {
  try {
    const company: ZCompany | AppError = await CompanyService.getById(companyId)
    if (company instanceof AppError) {
      throw Error(errorMessageKeys.company.cantGetCompany)
    }
    const updatedCompanyEmployees: any = {
      employees:
        company?.employees && company?.employees.length > 0
          ? company?.employees.filter((employee) => employee !== employeeId)
          : [],
    }
    await CompanyService.update(companyId, updatedCompanyEmployees)
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.company.cantUnregisterEmployee,
      apiError: err,
    })
  }
  return true
}
