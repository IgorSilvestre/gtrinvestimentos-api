import { create } from './services/companyService.create'
import { update } from './services/companyService.update'
import { getById } from './services/companyService.getById'
import { remove } from './services/companyService.remove'

export const CompanyService = {
  create,
  update,
  getById,
  remove,
}
