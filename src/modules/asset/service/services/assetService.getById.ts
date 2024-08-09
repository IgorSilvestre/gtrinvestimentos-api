import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { AssetRepository } from '../../infra/mongo/repository/AssetRepository'
import { IAssetDocument } from '../../interfaces-validation/IAssetDocument'

export async function getById(
  id: string,
): Promise<IAssetDocument | AppError> {
  try {
    const asset: IAssetDocument | null = await AssetRepository.getById(id)

    if (asset === null)
      return new AppError(
        { clientMessage: errorMessageKeys.asset.notFound },
        404,
      )
    return asset as IAssetDocument
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.asset.notFound, apiError: err },
      404,
    )
  }
}
