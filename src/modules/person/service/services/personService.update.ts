import { ZPerson } from '../../interfaces-validation/ZPerson'
import { PersonRepository } from '../../infra/mongo/repository/PersonRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function update (id: string, updatedPersonData: ZPerson): Promise<ZPerson | AppError> {
  try {
    const person: ZPerson | null = await PersonRepository.update(id, updatedPersonData)

    if (person === null) return new AppError({ clientMessage: 'returned: NULL' })
    return person as ZPerson
  } catch (err) {
    return new AppError({ clientMessage: errorMessageKeys.person.notUpdated, apiError: err })
  }
}
