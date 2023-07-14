import { regexForSearch } from '../../../../../../shared/functions/regexForSearch'
import { companyModel } from '../../companySchema'

interface ISearchParams {
  tags: string[]
  query: string
}
export async function search(queryParams: ISearchParams) {
  const { tags, query } = queryParams

  try {
    const searchParams: any = {}

    if (tags) searchParams.tags = { $all: tags }
    if(query) searchParams.name = { $regex: regexForSearch(query) }

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
