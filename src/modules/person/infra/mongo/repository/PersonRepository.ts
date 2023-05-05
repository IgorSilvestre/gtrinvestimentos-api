import { create } from './repositories/personRespository.create'
import { update } from './repositories/personRepository.update'
import { getById } from './repositories/personRepository.getById'
import { remove } from './repositories/personRepository.remove'

export const PersonRepository = {
  create,
  update,
  getById,
  remove,
}
