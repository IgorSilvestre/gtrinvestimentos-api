import { create } from './services/companyService.create'
import { update } from './services/companyService.update'
import { getById } from './services/companyService.getById'
import { remove } from './services/companyService.remove'
import { getAll } from './services/companyService.getAll'

export const CompanyService = {
  create,
  update,
  getById,
  getAll,
  remove,
}
