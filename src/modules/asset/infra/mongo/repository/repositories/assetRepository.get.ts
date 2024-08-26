import { assetModel } from '../../assetSchema'
import { IAssetDocument } from '../../../../interfaces-validation/IAssetDocument'
import { regexForSearch } from 'br-lib'
import { ISearchParams } from '../../../../../../shared/interfaces/ISearchParams'
import { defaultValues } from '../../../../../../shared/defaultValues'

export async function get(params: ISearchParams): Promise<IAssetDocument[] | number> {
  let { type, count, page, limit } = params
  let { tags, query } = params.search || {}

  page = page || defaultValues.paginationPage
  limit = limit || defaultValues.paginationLimit


  const searchParams: any = {}
  if (tags) {
    searchParams.tags = { $all: tags }
  }
  if (query) {
    switch (type) {
      case 'partialWord':
        searchParams.name = { $regex: regexForSearch(query) }
        break
      case 'matchWord':
        searchParams.name = { $regex: regexForSearch(query, true) }
      default: searchParams.$text = { $search: query }
    }
  }
  if (count) {
    try {
      const data = await assetModel
        .find(searchParams)
        .countDocuments()

      return data as number
    } catch (err) {
      throw new Error(err as string)
    }
  }

  try {
    const data = await assetModel
      .find(searchParams)
      .sort({ createdAt: -1 })
      .populate('tags')
      .populate('contact')
      .populate('zoning')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return data
  } catch (err) {
    throw new Error(err as string)
  }
}

