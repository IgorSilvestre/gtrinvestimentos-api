import { AppError } from '../../../../shared/AppError'
import { capitalizeFirstLetters } from '../../../../shared/functions/capitalizeFirstLetters'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZoningRepository } from '../../infra/mongo/repository/ZoningRepository'
import { ZZoning } from '../../interfaces-validation/ZZoning'

export async function create(zoningDTO: ZZoning): Promise<ZZoning | AppError> {
  zoningDTO.label = capitalizeFirstLetters(zoningDTO.label)

  try {
    const zonings = (await ZoningRepository.create(zoningDTO)) as ZZoning

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
