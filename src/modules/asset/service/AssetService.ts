import { create } from './services/assetService.create'
import { get } from './services/assetService.get'
import { getById } from './services/assetService.getById'
import { search } from './services/assetService.seach'
import { update } from './services/assetService.update'
import { remove } from './services/assetService.remove'

export const AssetService = {
  create,
  get,
  getById,
  update,
  search,
  remove,
  // addToSet,
  // get,
  // searchForSelect,
  // remove,
  // unregisterEmployee,
  // registerEmployee,
}
