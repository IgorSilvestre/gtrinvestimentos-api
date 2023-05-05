import { PersonRepository } from '../../infra/mongo/repository/PersonRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZPerson } from '../../interfaces-validation/ZPerson'

export async function getById (id: string): Promise<ZPerson | AppError> {
  try {
    const person: ZPerson | null = await PersonRepository.getById(id)

    if (person === null) return new AppError(
      { clientMessage: errorMessageKeys.person.notFound },
      404)
    return person as ZPerson
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.person.notFound, apiError: err },
      404,
    )
  }
}
