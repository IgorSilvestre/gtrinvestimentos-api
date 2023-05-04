import { Router } from 'express'
import { TagController } from '../../modules/tag/infra/express/tagController'

export const tagRouter = Router()

tagRouter.post('/', TagController.create)

tagRouter.get('/:id', TagController.getById)

tagRouter.put('/:id', TagController.update)

tagRouter.delete('/:id', TagController.remove)
