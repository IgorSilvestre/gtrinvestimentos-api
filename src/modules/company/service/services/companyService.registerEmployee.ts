import { AppError } from '../../../../shared/AppError'
// import { mergeTwoStringArrays } from '../../../../shared/functions/mergeTwoStringArrays'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZPerson } from '../../../person/interfaces-validation/ZPerson'
import { PersonService } from '../../../person/service/personService'
// import { ZCompany } from '../../interfaces-validation/ZCompany'
import { CompanyService } from '../companyService'
import { converStringToObjectIdMongo } from '../../../../shared/functions/convertStringToObjectIdMongo'

export async function registerEmployee(
  employeeId: string,
  companyId: string,
): Promise<true | AppError> {
  // let company: ZCompany | AppError
  let person: ZPerson | AppError

  // // Get company
  // try {
  //   company = await CompanyService.getById(companyId)
  //   if (company instanceof AppError) throw Error
  // } catch (err) {
  //   return new AppError({
  //     clientMessage: errorMessageKeys.company.cantGetCompany,
  //     apiError: err,
  //   })
  // }

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
  if(person?.tags) {
    try {
      await CompanyService.addToSet(companyId, {
        tags: { $each: converStringToObjectIdMongo(person?.tags)},
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
    await CompanyService.addToSet(companyId, { employees: converStringToObjectIdMongo(employeeId) })
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.company.cantRegisterEmployee,
      apiError: err,
    })
  }

  return true
}
