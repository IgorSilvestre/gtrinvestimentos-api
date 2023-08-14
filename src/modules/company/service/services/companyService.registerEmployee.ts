import { AppError } from '../../../../shared/AppError'
import { mergeTwoStringArrays } from '../../../../shared/functions/mergeTwoStringArrays'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZPerson } from '../../../person/interfaces-validation/ZPerson'
import { PersonService } from '../../../person/service/personService'
import { ZCompany } from '../../interfaces-validation/ZCompany'
import { CompanyService } from '../companyService'

export async function registerEmployee(
  employeeId: string,
  companyId: string,
): Promise<true | AppError> {
  let company: ZCompany | AppError
  let person: ZPerson | AppError

  // Get company
  try {
    company = await CompanyService.getById(companyId)
    if (company instanceof AppError) throw Error
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.company.cantGetCompany,
      apiError: err,
    })
  }

  // Get person
  try {
    person = await PersonService.getById(employeeId)
    if (person instanceof AppError) throw Error
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.person.cantGetPerson,
      apiError: err,
    })
  }
  // TODO REMOVE MERGE TWO ARRAYS - NEED TO GET COMPANY????
  // Add employee tags to company
  try {
    await CompanyService.update(companyId, {
      tags: mergeTwoStringArrays(company?.tags as string[], person?.tags),
    } as ZCompany)
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.company.notUpdated + ' (tags)',
      apiError: err,
    })
  }

  // Register employee
  try {
    const updatedCompanyEmployees = {
      employees:
        company.employees && company.employees.length > 0
          ? [...company.employees, employeeId]
          : [employeeId],
    }
    await CompanyService.update(companyId, updatedCompanyEmployees as ZCompany)
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.company.cantRegisterEmployee,
      apiError: err,
    })
  }

  return true
}
