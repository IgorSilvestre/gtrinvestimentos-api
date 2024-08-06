import { AppError } from '../../../../shared/AppError'
import { CACHE } from '../../../../shared/cache'
import { TagService } from '../tagService'
import { CacheTime } from '../../../../shared/keys/cacheTime'
import { cacheKeys } from '../../../../shared/keys/cacheKeys'
import { IDatabaseOption, normalizeTags } from '../../../../shared/functions/normalizeTags'

export async function getForSelect() {
  const cachedTagsAllForSelect = CACHE.get(cacheKeys.tag.allForSelect)
  if (cachedTagsAllForSelect) return cachedTagsAllForSelect

  const tags = await TagService.getAll()

  if (tags instanceof AppError) return tags

  const tagsAllForSelect = normalizeTags(tags as IDatabaseOption[])

  CACHE.set(cacheKeys.tag.allForSelect, tagsAllForSelect, CacheTime.one_year)

  return tagsAllForSelect
}
