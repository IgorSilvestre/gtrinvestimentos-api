import { create } from './repositories/personRespository.create'
import { update } from './repositories/personRepository.update'
import { getById } from './repositories/personRepository.getById'
import { remove } from './repositories/personRepository.remove'
import { getAll } from './repositories/personRepository.getAll'

export const PersonRepository = {
  create,
  update,
  getById,
  getAll,
  remove,
}
