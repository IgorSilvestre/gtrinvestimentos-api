import { Router } from 'express'
import { AssetController } from '../../../../modules/asset/infra/express/AssetController'

export const assetRouter = Router()

assetRouter.post('/', AssetController.create)
assetRouter.get('/', AssetController.get)

assetRouter.get('/search', AssetController.search)

assetRouter.get('/:id', AssetController.getById)
assetRouter.put('/:id', AssetController.update)
assetRouter.delete('/:id', AssetController.remove)

// GET REQUESTS
// zoningRouter.get('/all', ZoningController.getAll)
// zoningRouter.get('/all-for-select', ZoningController.getForSelect)


// zoningRouter.delete('/:id', ZoningController.remove)
