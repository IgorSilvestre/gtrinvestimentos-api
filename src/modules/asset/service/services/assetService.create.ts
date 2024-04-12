import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { AssetRepository } from '../../infra/mongo/repository/AssetRepository'
import { assetValidation, ZAsset } from '../../interfaces-validation/ZAsset'

export async function create(
  assetDTO: ZAsset,
): Promise<ZAsset | AppError> {
  const validatedassetDTO = assetValidation.safeParse(assetDTO)
  if (!validatedassetDTO.success)
    return new AppError(
      { clientMessage: validatedassetDTO.error.errors },
      400,
    )

  // try {
  //   const alreadyExists = await AssetRepository.search({
  //     query: assetDTO.name,
  //     isFullMatch: true,
  //   })
  //   if (alreadyExists instanceof Error)
  //     return new AppError({
  //       apiError: alreadyExists,
  //       clientMessage: errorMessageKeys.checkIfExistsFailed,
  //     })
  //   if (alreadyExists && alreadyExists?.data?.length > 0)
  //     return new AppError(
  //       { clientMessage: errorMessageKeys.alreadyExists },
  //       409,
  //     )
  // } catch (err) {
  //   return new AppError({
  //     clientMessage: errorMessageKeys.checkIfExistsFailed,
  //     apiError: err,
  //   })
  // }

  try {
    return (await AssetRepository.create(assetDTO)) as ZAsset
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.asset.notCreated,
      apiError: err,
    })
  }
}
