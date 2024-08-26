import { AppError } from '../../../../shared/AppError'
import { CACHE } from '../../../../shared/cache'
import { defaultValues } from '../../../../shared/defaultValues'
import { ISearchParams } from '../../../../shared/interfaces/ISearchParams'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { AssetRepository } from '../../infra/mongo/repository/AssetRepository'
import {
  IAssetDocument,
  IAssetPagination,
} from '../../interfaces-validation/IAssetDocument'

export async function get(
  params: ISearchParams
): Promise<IAssetPagination | AppError> {
  let { type, page, limit, search } = params

  limit =
    limit &&
    typeof limit == 'number' &&
    limit > 0 &&
    limit <= 100
      ? limit
      : defaultValues.paginationLimit

  page =
    page && typeof page == 'number'
      ? page
      : defaultValues.paginationPage

  const key = `asset-get-${type}-${page}-${limit}-${JSON.stringify(search)}`
  const cachedData = CACHE.get(key)
  // TODO Enable CACHING LATER
  // if (cachedData) return cachedData as IAssetPagination

  // get results
  let assets: IAssetDocument[] | AppError
  try {
    assets = (await AssetRepository.get({
      search,
      page,
      limit,
      type,
    })) as IAssetDocument[]
    if (assets === null)
      return new AppError(
        { clientMessage: errorMessageKeys.asset.notFound },
        404,
      )
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.asset.notFound, apiError: err },
      404,
    )
  }

  // get number of results
  let getPagesError: AppError | null = null
  let totalPages: number | null = null
  let nextPage: number | null = null
  let previousPage: number | null = null
  let numberOfDocuments: number | null = null

  try {
    numberOfDocuments = (await AssetRepository.get({
      search,
      page,
      limit,
      type,
    })) as number

    if (numberOfDocuments === null)
      getPagesError = new AppError(
        { clientMessage: errorMessageKeys.asset.notFound },
        404,
      )

    totalPages = Math.ceil(numberOfDocuments / limit)
    nextPage = page < totalPages ? page + 1 : null
    previousPage = page > 1 ? page - 1 : null
  } catch (err) {
    getPagesError = new AppError(
      { clientMessage: errorMessageKeys.asset.notFound, apiError: err },
      404,
    )
  }


  const response = {
    data: assets as IAssetDocument[],
    numberOfDocuments,
    nextPage,
    previousPage,
    totalPages,
  }
  CACHE.set(key, response, 300)

  return response
}
