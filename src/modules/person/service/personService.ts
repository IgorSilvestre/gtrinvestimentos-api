import { create } from './services/personService.create'
import { update } from './services/personService.update'
import { getById } from './services/personService.getById'
import { remove } from './services/personService.remove'

export const PersonService = {
  create,
  update,
  getById,
  remove,
}
