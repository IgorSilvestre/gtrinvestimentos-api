import { AppError } from "../../../../shared/AppError"
import { errorMessageKeys } from "../../../../shared/keys/errorMessageKeys"
import { AssetRepository } from "../../infra/mongo/repository/AssetRepository"
import { ZAsset } from "../../interfaces-validation/ZAsset"

export async function update(
  id: string,
  assetUpdatedData: {},
): Promise<ZAsset | AppError> {
  try {
    const asset: ZAsset | null = await AssetRepository.update(
      id,
      assetUpdatedData,
    )

    if (asset === null)
      return new AppError({ clientMessage: 'returned: NULL' })
    return asset as ZAsset
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.company.notUpdated,
      apiError: err,
    })
  }
}
