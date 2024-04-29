import { Router } from 'express'
import { TagController } from '../../../../modules/tag/infra/express/tagController'

export const tagRouter = Router()

tagRouter.post('/', TagController.create)

// GET REQUESTS
tagRouter.get('/all', TagController.getAll)
tagRouter.get('/all-for-select', TagController.getForSelect)

tagRouter.get('/find', TagController.find)

tagRouter.get('/:id', TagController.getById)

tagRouter.put('/:id', TagController.update)

tagRouter.delete('/:id', TagController.remove)
