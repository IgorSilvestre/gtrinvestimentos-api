import { Router } from 'express'
import { PersonController } from '../../modules/person/infra/express/personController'
import { sendPeopleToDB } from '/home/user/ff/gtrinvestimentos-api/src/tableScripts/people/people'

export const personRouter = Router()

personRouter.post('/', PersonController.create)

personRouter.get('/table', sendPeopleToDB)

personRouter.get('/all', PersonController.getAll)

personRouter.post('/search', PersonController.search)

personRouter.get('/:id', PersonController.getById)

personRouter.put('/:id', PersonController.update)

personRouter.delete('/:id', PersonController.remove)
