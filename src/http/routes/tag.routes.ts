import { Router } from 'express'
import { TagController } from '../../modules/tag/infra/express/tagController'
import { createTags } from '../../tableScripts/tags/createTags'


export const tagRouter = Router()

tagRouter.post('/', TagController.create)

// TABLE SCRIPTS
tagRouter.get('/createTags', createTags)

// GET REQUESTS
tagRouter.get('/all', TagController.getAll)
tagRouter.get('/all-for-select', TagController.getForSelect)
tagRouter.get('/:id', TagController.getById)


tagRouter.put('/:id', TagController.update)

tagRouter.delete('/:id', TagController.remove)
