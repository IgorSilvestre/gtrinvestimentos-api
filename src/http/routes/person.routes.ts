import { Router } from 'express'
import { PersonController } from '../../modules/person/infra/express/personController'

export const personRouter = Router()

personRouter.post('/', PersonController.create)

personRouter.get('/getAll', PersonController.getAll)

personRouter.get('/:id', PersonController.getById)

personRouter.put('/:id', PersonController.update)

personRouter.delete('/:id', PersonController.remove)
