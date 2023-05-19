import { PersonRepository } from '../../infra/mongo/repository/PersonRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZPerson } from '../../interfaces-validation/ZPerson'

export async function getAll (): Promise<ZPerson[] | AppError> {
  try {
    const person = await PersonRepository.getAll()

    if (!person) return new AppError(
      { clientMessage: errorMessageKeys.person.notFound },
      404)
    return person as ZPerson[]
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.person.notFound, apiError: err },
      404,
    )
  }
}
