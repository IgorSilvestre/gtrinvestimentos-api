import { ZPerson } from '../../interfaces-validation/ZPerson'
import { PersonRepository } from '../../infra/mongo/repository/PersonRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { CompanyService } from '../../../company/service/companyService'

export async function create(personDTO: ZPerson): Promise<ZPerson | AppError> {
  // Check if person already exists
  try {
    const alreadyExists = await PersonRepository.search(
      {
        query: personDTO.name,
      },
      true,
    )
    if (alreadyExists?.length > 0) {
      return new AppError(
        { clientMessage: errorMessageKeys.alreadyExists },
        409,
      )
    }
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.checkIfExistsFailed,
      apiError: err,
    })
  }

  // NORMALIZING DATA
  // Normalizing email
  if (personDTO.email) personDTO.email = personDTO.email.toLowerCase()

  // Create person
  let personSaved: ZPerson | AppError
  try {
    personSaved = await PersonRepository.create(personDTO)
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.person.notCreated,
      apiError: err,
    })
  }

  // Register employee in company
  let employeeRegistered: true | AppError | undefined
  if (personDTO.company) {
    employeeRegistered = await CompanyService.registerEmployee(
      personSaved._id,
      personDTO.company,
    )
    if (employeeRegistered instanceof AppError) {
      personSaved.error = employeeRegistered.message.clientMessage as string
      let isCompanyRemoved
      try {
        isCompanyRemoved = await PersonRepository.update(personSaved._id, {
          company: undefined,
        } as ZPerson)
      } catch (err) {
        if (isCompanyRemoved instanceof AppError) {
          personSaved.error = isCompanyRemoved.message.clientMessage as string
          return personSaved
        }
        return personSaved
      }
    }
  }

  return personSaved
}
