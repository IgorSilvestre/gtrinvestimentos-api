import { AppError } from '../../../../../shared/AppError'
import { errorMessageKeys } from '../../../../../shared/keys/errorMessageKeys'
import { ZPersonModel } from '../../../v1/infra/mongo/personSchema'
import { PersonRepository_v2 } from '../../infra/mongo/repository/PersonRepository'

export async function find(
  params: any,
): Promise<ZPersonModel[] | AppError> {
  try {
    const people: ZPersonModel[] | null = await PersonRepository_v2.find(
      params,
    )

    if (people === null)
      return new AppError(
        { clientMessage: errorMessageKeys.person.notFound },
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
