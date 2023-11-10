import { defaultValues } from '../../../../../../shared/defaultValues'
import { regexForSearch } from '../../../../../../shared/functions/regexForSearch'
import { ISearchParams } from '../../../../../../shared/interfaces/ISearchParams'
import { ICompaniesPaginated } from '../../../../interfaces-validation/ICompaniesPaginated'
import { companyModel } from '../../companySchema'

async function countTotalCompanies(queryParams: ISearchParams) {
  try {
    return companyModel.find(queryParams).countDocuments()
  } catch (err) {
    console.log(new Error(err as string))
    return 0
  }
}
async function searchCompanies(
  params: ISearchParams,
  page: number,
  limit: number,
) {
  try {
    return companyModel
      .find(params)
      .sort({ createdAt: -1 })
      .populate('tags')
      .populate('employees')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
  } catch (err) {
    throw new Error(err as string)
  }
}

export async function search(
  queryParams: ISearchParams,
): Promise<ICompaniesPaginated | Error> {
  const { tags, query, isFullMatch } = queryParams
  let { page, limit } = queryParams

  if (!page) page = defaultValues.paginationPage
  if (!limit) limit = defaultValues.paginationLimit

  const searchParams: any = {}
  if (tags) searchParams.tags = { $all: tags }
  if (query)
    isFullMatch
      ? (searchParams.name = { $regex: regexForSearch(query, true) })
      : (searchParams.$text = { $search: query })

  const totalCompanies = await countTotalCompanies(searchParams)
  const totalPages = Math.ceil(totalCompanies / limit)

  page = page > totalPages ? totalPages : page

  const companies = await searchCompanies(searchParams, page, limit)

  const previousPage = page > 1 ? page - 1 : null
  const nextPage = page < totalPages ? page + 1 : null

  return {
    data: companies,
    totalCompanies,
    totalPages,
    previousPage,
    nextPage,
  }
}
