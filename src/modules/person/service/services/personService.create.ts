import { ZPerson } from '../../interfaces-validation/ZPerson'
import { PersonRepository } from '../../infra/mongo/repository/PersonRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export async function create (personDTO: ZPerson): Promise<ZPerson | AppError> {
  try {
    const alreadyExists = await PersonRepository.search({
      query: personDTO.name,
    }, true)
    if (alreadyExists && alreadyExists?.length > 0)
      return new AppError(
        { clientMessage: errorMessageKeys.alreadyExists },
        409,
      )
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.searchFailed,
      apiError: err,
    })
  }
  try {
    return await PersonRepository.create(personDTO) as ZPerson
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.person.notCreated,
      apiError: err,
    })
  }
}
