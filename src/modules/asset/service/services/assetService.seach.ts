import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { IAssetPagination } from '../../interfaces-validation/IAssetDocument'
import { AssetRepository } from '../../infra/mongo/repository/AssetRepository'
import { CACHE } from '../../../../shared/cache'
import { stringifyObjectWithRegex } from 'br-lib'

export async function search(
  params: Record<string, any>
): Promise<IAssetPagination | AppError> {
  const key = `asset-search-${stringifyObjectWithRegex(params)}`
  const cachedData = CACHE.get(key)
  // if (cachedData) return cachedData as IAssetPagination

  try {
    const assets: IAssetPagination | null | Error =
      await AssetRepository.search(params)

    if (assets === null)
      return new AppError(
        { clientMessage: errorMessageKeys.asset.notFound },
        404,
      )

    if (assets instanceof Error)
      return new AppError(
        {
          apiError: assets,
          clientMessage: errorMessageKeys.asset.cantGet,
        },
        503,
      )

    CACHE.set(key, assets, 300)
    return assets
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.asset.notFound, apiError: err },
      404,
    )
  }
}

