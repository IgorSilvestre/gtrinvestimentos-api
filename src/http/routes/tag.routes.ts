import { Router } from 'express'
import { TagController } from '../../modules/tag/infra/express/tagController'
import { createTags } from "/home/orotel/dev/gtrinvestimentos-api/Scripts anselmo/populate-database/tag./createTags.js"


export const tagRouter = Router()

tagRouter.post('/', TagController.create)
// PostTags
tagRouter.post('/send-tag',createTags )

// GET REQUESTS
tagRouter.get('/all', TagController.getAll)
tagRouter.get('/forSelect', TagController.getForSelect)
tagRouter.get('/:id', TagController.getById)


tagRouter.put('/:id', TagController.update)

tagRouter.delete('/:id', TagController.remove)
