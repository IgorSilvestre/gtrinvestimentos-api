import { getById } from './controllers/tagController.getById'
import { create } from './controllers/tagController.create'
import { update } from './controllers/tagController.update'
import { remove } from './controllers/tagController.remove'
import { getAll } from './controllers/tagController.getAll'
import { getForSelect } from './controllers/tagController.getForSelect'
import { find } from './controllers/tagController.find'

export const TagController = {
    create,
    getById,
    getAll,
    getForSelect,
    update,
    remove,
    find,
}
