import { regexForSearch } from '../../../../../../shared/functions/regexForSearch'
import { ISearchParams } from '../../../../../../shared/interfaces/ISearchParams'
import { personModel } from '../../personSchema'

export async function search(queryParams: ISearchParams) {
  const { tags, query } = queryParams

  try {
    const searchParams: any = {}

    if (tags) searchParams.tags = { $all: tags }
    if(query) searchParams.name = { $regex: regexForSearch(query) }

    const people = await personModel
      .find(searchParams)
      .sort({ createdAt: -1 })
      .populate('tags')
      .populate('company')

    return people
  } catch (err) {
    throw new Error(err as string)
  }
}
