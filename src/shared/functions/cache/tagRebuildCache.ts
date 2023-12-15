import { TagRepository } from '../../../modules/tag/infra/mongo/repository/TagRepository'
import { normalizeTags } from '../../../modules/tag/interfaces-validation/normalizeTags'
import { CACHE } from '../../cache'
import { cacheKeys } from '../../keys/cacheKeys'
import { CacheTime } from '../../keys/cacheTime'

/**
 * @returns True if cache was rebuilded, false if not
 */
export async function tagRebuildCache() {
  const allTags = await TagRepository.getAll()

  if (!allTags) return false

  const allForSelectTags = normalizeTags(allTags)

  CACHE.set(cacheKeys.tag.all, allTags, CacheTime.one_year)
  CACHE.set(cacheKeys.tag.allForSelect, allForSelectTags, CacheTime.one_year)
  return true
}
