import { AppError } from '../../../../shared/AppError'
import { CACHE } from '../../../../shared/cache'
import { defaultValues } from '../../../../shared/defaultValues'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { AssetRepository } from '../../infra/mongo/repository/AssetRepository'
import {
  IAssetDocument,
  IAssetPagination,
} from '../../interfaces-validation/IAssetDocument'

export async function get(
  search: {},
  possibleLimit: number | undefined,
  possiblePage: number | undefined,
): Promise<IAssetPagination | AppError> {
  const limit =
    possibleLimit &&
    typeof possibleLimit == 'number' &&
    possibleLimit > 0 &&
    possibleLimit <= 100
      ? possibleLimit
      : defaultValues.paginationLimit
  const page =
    possiblePage && typeof possiblePage == 'number'
      ? possiblePage
      : defaultValues.paginationPage

  const key = `asset-get-${page}-${limit}`
  // Try to get the data from cache
  const cachedData = CACHE.get(key)
  // ! Enable CACHING LATER
  // if (cachedData) return cachedData as IAssetPagination

  // get results
  let assets: IAssetDocument[] | AppError
  try {
    assets = (await AssetRepository.get(
      search,
      page,
      limit,
    )) as IAssetDocument[]
    if (assets === null)
      return new AppError(
        { clientMessage: errorMessageKeys.company.notFound },
        404,
      )
  } catch (err) {
    return new AppError(
      { clientMessage: errorMessageKeys.company.notFound, apiError: err },
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
    numberOfDocuments = (await AssetRepository.get(
      search,
      page,
      limit,
      true,
    )) as number
    if (numberOfDocuments === null)
      getPagesError = new AppError(
        { clientMessage: errorMessageKeys.company.notFound },
        404,
      )
    totalPages = Math.ceil(numberOfDocuments / limit)
    nextPage = page < totalPages ? page + 1 : null
    previousPage = page > 1 ? page - 1 : null
  } catch (err) {
    getPagesError = new AppError(
      { clientMessage: errorMessageKeys.company.notFound, apiError: err },
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
