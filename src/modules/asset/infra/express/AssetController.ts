import { create } from './controllers/assetController.create'
import { get } from './controllers/assetController.get'
import { getById } from './controllers/assetController.getById'
import { search } from './controllers/assetController.search'
import { update } from './controllers/assetController.update'

export const AssetController = {
  create,
  get,
  getById,
  update,
  search,
  // get,
  // searchForSelect,
  // registerEmployee,
  // remove,
}
