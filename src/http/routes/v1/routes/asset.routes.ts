import { Router } from 'express'
import { AssetController } from '../../../../modules/asset/infra/express/AssetController'

export const assetRouter = Router()

assetRouter.post('/', AssetController.create)
assetRouter.get('/', AssetController.get)

// GET REQUESTS
// zoningRouter.get('/all', ZoningController.getAll)
// zoningRouter.get('/all-for-select', ZoningController.getForSelect)
// zoningRouter.get('/:id', ZoningController.getById)

// zoningRouter.put('/:id', ZoningController.update)

// zoningRouter.delete('/:id', ZoningController.remove)
