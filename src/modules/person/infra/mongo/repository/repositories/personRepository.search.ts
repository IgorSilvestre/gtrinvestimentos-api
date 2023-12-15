import { regexForSearch } from '../../../../../../shared/functions/regexForSearch'
import { ISearchParams } from '../../../../../../shared/interfaces/ISearchParams'
import { personModel } from '../../personSchema'

export async function search(queryParams: ISearchParams, isFullMatch = false) {
  const { tags, query } = queryParams

  try {
    const searchParams: any = {}

    if (tags) searchParams.tags = { $all: tags }
    if (query)
      isFullMatch
        ? (searchParams.name = { $regex: regexForSearch(query, true) })
        : (searchParams.$text = { $search: query })
    // TODO add escapeRegex function to query PERSON

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
