import { Router } from 'express'
import { DemandController } from '../../modules/demand/infra/express/demandController'

export const demandRouter = Router()

demandRouter.post('/', DemandController.create)

// demandRouter.get('/search', DemandController.search)

// demandRouter.get('/get', DemandController.get)

// demandRouter.get('/:id', DemandController.getById)

// demandRouter.put('/:id', DemandController.update)

// demandRouter.delete('/:id', DemandController.remove)
