import { AppError } from '../../../../shared/AppError'
import { IDatabaseOption, normalizeTags } from '../../../../shared/functions/normalizeTags'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZoningRepository } from '../../infra/mongo/repository/ZoningRepository'
import { ZZoning } from '../../interfaces-validation/ZZoning'

export async function getForSelect (): Promise<ZZoning[] | AppError> {
  try {
    const zonings = (await ZoningRepository.getAll()) as ZZoning[]

    // const isCacheRebuilt = zoningRebuildCache()
    // if (!isCacheRebuilt) console.log(errorMessageKeys.zoning.failedToRebuildCache)

    return normalizeTags(zonings as IDatabaseOption[])
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.zoning.notCreated,
      apiError: err,
    })
  }
}
