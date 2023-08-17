import { create } from './services/personService.create'
import { update } from './services/personService.update'
import { getById } from './services/personService.getById'
import { remove } from './services/personService.remove'
import { getAll } from './services/personService.getAll'
import { search } from './services/personService.search'
import { sendToDB } from './services/personService.sendToDB'

export const PersonService = {
  create,
  update,
  getById,
  getAll,
  search,
  sendToDB,
  remove,
}
