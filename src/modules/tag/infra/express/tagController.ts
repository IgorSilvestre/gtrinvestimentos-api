import { getById } from './controllers/tagController.getById'
import { create } from './controllers/tagController.create'
import { update } from './controllers/tagController.update'
import { remove } from './controllers/tagController.remove'

export const TagController = {
  create,
  getById,
  update,
  remove
}
