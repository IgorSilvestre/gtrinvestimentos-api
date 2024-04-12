import { Router } from 'express'
import { ZoningController } from '../../modules/zoning/infra/express/ZoningController'

export const zoningRouter = Router()

zoningRouter.post('/', ZoningController.create)

// GET REQUESTS
// zoningRouter.get('/all', ZoningController.getAll)
// zoningRouter.get('/all-for-select', ZoningController.getForSelect)
// zoningRouter.get('/:id', ZoningController.getById)

// zoningRouter.put('/:id', ZoningController.update)

// zoningRouter.delete('/:id', ZoningController.remove)
