import { PersonRepository } from '../../infra/mongo/repository/PersonRepository'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZPerson } from '../../interfaces-validation/ZPerson'
import { CACHE } from '../../../../shared/cache'
import { CacheTime } from '../../../../shared/keys/cacheTime'
import { cacheKeys } from '../../../../shared/keys/cacheKeys'

export async function getAll(): Promise<ZPerson[] | AppError> {
  const cachedData = CACHE.get(cacheKeys.person.all)
  if (cachedData) return cachedData as ZPerson[]

  try {
    const person = await PersonRepository.getAll()

    if (!person)
      return new AppError(
        { clientMessage: errorMessageKeys.person.notFound },
        404,
      )

    CACHE.set(cacheKeys.person.all, person, CacheTime.one_week)
    return person as ZPerson[]
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.person.notFound, apiError: err },
      404,
    )
  }
}
