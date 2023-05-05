import { ZPerson } from '../../interfaces-validation/ZPerson'
import { PersonRepository } from '../../infra/mongo/repository/PersonRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function create (personDTO: ZPerson): Promise<ZPerson | AppError> {
  try {
    return await PersonRepository.create(personDTO) as ZPerson
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.person.notCreated,
      apiError: err,
    })
  }
}
