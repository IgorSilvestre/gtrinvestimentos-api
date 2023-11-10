import { defaultValues } from '../../../../../../shared/defaultValues'
import { regexForSearch } from '../../../../../../shared/functions/regexForSearch'
import { ISearchParams } from '../../../../../../shared/interfaces/ISearchParams'
import { ICompaniesPaginated } from '../../../../interfaces-validation/ICompaniesPaginated'
import { companyModel } from '../../companySchema'

export async function search(
  queryParams: ISearchParams,
): Promise<ICompaniesPaginated> {
  const { tags, query, isFullMatch } = queryParams
  let { page, limit } = queryParams

  if (!page) page = defaultValues.paginationPage
  if (!limit) limit = defaultValues.paginationLimit

  try {
    const searchParams: any = {}
    if (tags) searchParams.tags = { $all: tags }
    if (query)
      isFullMatch
        ? (searchParams.name = { $regex: regexForSearch(query, true) })
        : (searchParams.$text = { $search: query })

    const totalCompanies = await companyModel
      .find(searchParams)
      .countDocuments()
    const totalPages = Math.ceil(totalCompanies / limit)
    
    page = page > totalPages ? totalPages : page

    const companies = await companyModel
      .find(searchParams)
      .sort({ createdAt: -1 })
      .populate('tags')
      .populate('employees')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    const previousPage = page > 1 ? page - 1 : null
    const nextPage = page < totalPages ? page + 1 : null

    return {
      data: companies,
      totalCompanies,
      totalPages,
      previousPage,
      nextPage
    }
  } catch (err) {
    throw new Error(err as string)
  }
}
