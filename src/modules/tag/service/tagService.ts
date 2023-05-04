import { create } from './services/tagService.create'
import { update } from './services/tagService.update'
import { getById } from './services/tagService.getById'
import { remove } from './services/tagService.remove'

export const TagService = {
  create,
  update,
  getById,
  remove,
}
