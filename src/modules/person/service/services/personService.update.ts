import { ZPerson } from '../../interfaces-validation/ZPerson'
import { PersonRepository } from '../../infra/mongo/repository/PersonRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { CompanyRepository } from '../../../company/infra/mongo/repository/CompanyRepository'
import { CompanyService } from '../../../company/service/companyService'
import { ZCompany } from '../../../company/interfaces-validation/ZCompany'

interface IGetPerson extends Omit<ZPerson, 'company'> {
  company: ZCompany
}

export async function update(
  id: string,
  updatedPersonData: ZPerson,
): Promise<ZPerson | AppError> {
  let person: IGetPerson
  let error
  // get Person
  try {
    person = (await PersonRepository.getById(id)) as any
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.person.notFound,
      apiError: err,
    })
  }

  if (
    person?.company &&
    person?.company?._id.toString() !== updatedPersonData.company
  ) {
    let isUnregistered

    // if company changed, unregister employee from old company
    try {
      await CompanyRepository.updateWithPull(person?.company._id, {
        employees: id,
      })
      isUnregistered = true
    } catch (err) {
      error = {
        clientMessage: errorMessageKeys.company.cantUnregisterEmployee,
        apiError: err,
      }
      console.log(error)
    }

    if (isUnregistered) {
      // register employee to new company
      try {
        await CompanyService.registerEmployee(
          id,
          updatedPersonData.company as string,
        )
      } catch (err) {
        return new AppError({
          clientMessage: errorMessageKeys.company.cantRegisterEmployee,
          apiError: err,
        })
      }
    }
  }

  // update Person
  try {
    const person: ZPerson | null = await PersonRepository.update(
      id,
      updatedPersonData,
    )
    if (person === null)
      return new AppError({ clientMessage: 'returned: NULL' })

    if (error) person.error = error.clientMessage
    return person as ZPerson
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.person.notUpdated,
      apiError: err,
    })
  }
}
