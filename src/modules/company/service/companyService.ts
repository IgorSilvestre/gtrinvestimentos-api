import { create } from './services/companyService.create'
import { update } from './services/companyService.update'
import { getById } from './services/companyService.getById'
import { remove } from './services/companyService.remove'
import { getAll } from './services/companyService.getAll'
import { search } from './services/companyService.seach'
import { unregisterEmployee } from './services/companyService.unregisterEmployee'
import { registerEmployee } from './services/companyService.registerEmployee'

export const CompanyService = {
  create,
  update,
  getById,
  getAll,
  search,
  remove,
  unregisterEmployee,
  registerEmployee,
}
