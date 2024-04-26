import { create } from './repositories/tagRespository.create'
import { update } from './repositories/tagRepository.update'
import { getById } from './repositories/tagRepository.getById'
import { remove } from './repositories/tagRepository.remove'
import { getAll } from './repositories/tagRepository.getAll'
import { find } from './repositories/tagRepository.find'

export const TagRepository = {
    create,
    find,
    update,
    getById,
    getAll,
    remove,
}
