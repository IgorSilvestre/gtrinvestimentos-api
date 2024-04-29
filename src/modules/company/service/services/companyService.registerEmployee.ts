import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZPerson } from '../../../person/interfaces-validation/ZPerson'
import { CompanyService } from '../companyService'
import { converStringToObjectIdMongo } from '../../../../shared/functions/convertStringToObjectIdMongo'
import { PersonService } from '../../../person/v1/service/personService'

export async function registerEmployee(
  employeeId: string,
  companyId: string,
): Promise<true | AppError> {
  // let company: ZCompany | AppError
  let person: ZPerson | AppError

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

  // Add employee tags to company
  if (person?.tags) {
    try {
      await CompanyService.addToSet(companyId, {
        tags: { $each: converStringToObjectIdMongo(person?.tags) },
      })
    } catch (err) {
      return new AppError({
        clientMessage: errorMessageKeys.company.notUpdated + ' (tags)',
        apiError: err,
      })
    }
  }

  // Register employee
  try {
    await CompanyService.addToSet(companyId, {
      employees: converStringToObjectIdMongo(employeeId),
    })
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.company.cantRegisterEmployee,
      apiError: err,
    })
  }

  return true
}
