import { defaultValues } from '../../../../../../shared/defaultValues'
import { regexForSearch } from '../../../../../../shared/functions/regexForSearch'
import { ISearchParams } from '../../../../../../shared/interfaces/ISearchParams'
import { ZCompanyModel, companyModel } from '../../companySchema'

export async function search(queryParams: ISearchParams): Promise<ZCompanyModel[]> {
  const { tags, query, isFullMatch } = queryParams
  let { page, limit } = queryParams
  console.log('queryParams', queryParams)

  if (!page) page = defaultValues.paginationPage
  if (!limit) limit = defaultValues.paginationLimit 
  
  try {
    const searchParams: any = {}
    
    if (tags) searchParams.tags = { $all: tags }
    if (query)
      isFullMatch
        ? (searchParams.name = { $regex: regexForSearch(query, true) })
        : (searchParams.$text = { $search: query })

    const companies = await companyModel
      .find(searchParams)
      .sort({ createdAt: -1 })
      .populate('tags')
      .populate('employees')
      .skip((page - 1) * limit)
      .limit(limit)

    return companies as any // TODO there is type error here, I think is becuse the tags IDs are not strings
  } catch (err) {
    throw new Error(err as string)
  }
}
