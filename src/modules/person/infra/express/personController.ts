import { getById } from './controllers/personController.getById'
import { create } from './controllers/personController.create'
import { update } from './controllers/personController.update'
import { remove } from './controllers/personController.remove'

export const PersonController = {
  create,
  getById,
  update,
  remove
}
