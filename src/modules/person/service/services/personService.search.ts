import { AppError } from '../../../../shared/AppError'
import { ISearchParams } from '../../../../shared/interfaces/ISearchParams'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZPersonModel } from '../../infra/mongo/personSchema'
import { PersonRepository } from '../../infra/mongo/repository/PersonRepository'

export async function search(
  searchParams: ISearchParams,
): Promise<ZPersonModel[] | AppError> {
  try {
    const people: ZPersonModel[] | null = await PersonRepository.search(
      searchParams,
    )

    if (people === null)
      return new AppError(
        { clientMessage: errorMessageKeys.company.notFound },
        404,
      )
    return people as ZPersonModel[]
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.person.notFound, apiError: err },
      404,
    )
  }
}
