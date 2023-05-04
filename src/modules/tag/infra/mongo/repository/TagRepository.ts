import { create } from './repositories/tagRespository.create'
import { update } from './repositories/tagRepository.update'
import { getById } from './repositories/tagRepository.getById'
import { remove } from './repositories/tagRepository.remove'

export const TagRepository = {
  create,
  update,
  getById,
  remove,
}
