import { create } from './services/companyService.create'
import { update } from './services/companyService.update'
import { getById } from './services/companyService.getById'
import { remove } from './services/companyService.remove'
import { getAll } from './services/companyService.getAll'
import { search } from './services/companyService.seach'
import { unregisterEmployee } from './services/companyService.unregisterEmployee'
import { registerEmployee } from './services/companyService.registerEmployee'
import { addToSet } from './services/companyService.addToSet'

export const CompanyService = {
  create,
  update,
  addToSet,
  getById,
  getAll,
  search,
  remove,
  unregisterEmployee,
  registerEmployee,
}
