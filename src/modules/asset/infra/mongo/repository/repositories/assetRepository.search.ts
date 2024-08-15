import { CACHE } from '../../../../../../shared/cache'
import { defaultValues } from '../../../../../../shared/defaultValues'
import { regexForSearch } from '../../../../../../shared/functions/regexForSearch'
import { ISearchParams } from '../../../../../../shared/interfaces/ISearchParams'
import { stringifyObjectWithRegex } from 'br-lib'
import { assetModel } from '../../assetSchema'
import { IAssetDocument, IAssetPagination } from '../../../../interfaces-validation/IAssetDocument'

async function countTotalAssets(queryParams: ISearchParams) {
  try {
    return assetModel.find(queryParams).countDocuments()
  } catch (err) {
    console.log(new Error(err as string))
    return 0
  }
}
async function searchAssets(
  params: ISearchParams,
  page: number,
  limit: number,
) {
  const key = `asset-search-${stringifyObjectWithRegex(params)}-${page}-${limit}`
  console.log(key)
  // Try to get the data from cache
  const cachedData = CACHE.get(key)
  if (cachedData) return cachedData as IAssetDocument[]

  try {
    const data = await assetModel
      .find(params)
      .sort({ createdAt: -1 })
      .populate('tags')
      .populate('zoning')
      .populate('contact')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    CACHE.set(key, data, 300)

    return data
  } catch (err) {
    throw new Error(err as string)
  }
}

export async function search(
  queryParams: ISearchParams,
): Promise<IAssetPagination | Error> {
  const { tags, query, isFullMatch, partialStringSearch } = queryParams
  let { page, limit } = queryParams

  if (!limit) limit = defaultValues.paginationLimit

  const searchParams: any = {}
  if (tags) {
    searchParams.tags = { $all: tags }
  }
 
  // TODO fix this??
  if (query) {
    ;(() => {
      if (isFullMatch) {
        searchParams.name = { $regex: regexForSearch(query, true) }
        return
      }
      else if (partialStringSearch) {
        searchParams.name = { $regex: regexForSearch(query) }
        return
      }
      else searchParams.$text = { $search: query }
    })()
  }

  // TODO make all this pagination in a function, see how is done in assetService.get.ts
  const totalAssets = await countTotalAssets(searchParams)
  const totalPages = Math.ceil(totalAssets / limit)

  page = page && page <= totalPages ? page : defaultValues.paginationPage

  const assets = await searchAssets(searchParams, page, limit)

  const previousPage = page > 1 ? page - 1 : null
  const nextPage = page < totalPages ? page + 1 : null

  return {
    data: assets,
    totalAssets,
    totalPages,
    previousPage,
    nextPage,
  }
}
