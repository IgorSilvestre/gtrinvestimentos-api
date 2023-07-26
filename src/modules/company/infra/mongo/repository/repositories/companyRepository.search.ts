import { regexForSearch } from '../../../../../../shared/functions/regexForSearch'
import { ISearchParams } from '../../../../../../shared/interfaces/ISearchParams'
import { companyModel } from '../../companySchema'

export async function search(queryParams: ISearchParams, isFullMatch = false) {
  const { tags, query } = queryParams

  try {
    const searchParams: any = {}

    if (tags) searchParams.tags = { $all: tags }
    if (query)
      isFullMatch
        ? (searchParams.name = { $regex: regexForSearch(query, true) })
        : (searchParams.name = { $regex: regexForSearch(query) })

    const companies = await companyModel
      .find(searchParams)
      .sort({ createdAt: -1 })
      .populate('tags')
      .populate('employees')

    return companies
  } catch (err) {
    throw new Error(err as string)
  }
}
