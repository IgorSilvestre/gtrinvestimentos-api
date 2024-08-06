import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZoningRepository } from '../../infra/mongo/repository/ZoningRepository'
import { ZZoning } from '../../interfaces-validation/ZZoning'

export async function getAll (): Promise<ZZoning[] | AppError> {
  try {
    const zonings = (await ZoningRepository.getAll()) as ZZoning[]

    // const isCacheRebuilt = zoningRebuildCache()
    // if (!isCacheRebuilt) console.log(errorMessageKeys.zoning.failedToRebuildCache)

    return zonings
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.zoning.notCreated,
      apiError: err,
    })
  }
}
