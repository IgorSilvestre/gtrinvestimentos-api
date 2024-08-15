import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ISearchParams } from '../../../../shared/interfaces/ISearchParams'
import { IAssetPagination } from '../../interfaces-validation/IAssetDocument'
import { AssetRepository } from '../../infra/mongo/repository/AssetRepository'

export async function search(
  searchParams: ISearchParams,
): Promise<IAssetPagination | AppError> {
  if (searchParams?.page) {
    searchParams.page = Number(searchParams.page)
    searchParams.page < 1 ? delete searchParams.page : null
  }
  if (searchParams?.limit) {
    searchParams.limit = Number(searchParams.limit)
    searchParams.limit < 1 ? delete searchParams.limit : null
  }

  try {
    const assets: IAssetPagination | null | Error =
      await AssetRepository.search(searchParams)

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

    return assets
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.asset.notFound, apiError: err },
      404,
    )
  }
}

