import { AppError } from '../../../../shared/AppError'
import { CACHE } from '../../../../shared/cache'
import { normalizeTags } from '../../interfaces-validation/normalizeTags'
import { TagService } from '../tagService'
import { CacheTime } from '../../../../shared/keys/cacheTime'
import { cacheKeys } from '../../../../shared/keys/cacheKeys'

export async function getForSelect() {
  const cachedTagsAllForSelect = CACHE.get(cacheKeys.tag.allForSelect)
  if (cachedTagsAllForSelect) return cachedTagsAllForSelect

  const tags = await TagService.getAll()

  if (tags instanceof AppError) return tags

  const tagsAllForSelect = normalizeTags(tags)

  CACHE.set(cacheKeys.tag.allForSelect, tagsAllForSelect, CacheTime.one_year)

  return tagsAllForSelect
}
