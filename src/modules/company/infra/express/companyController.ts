import { getById } from './controllers/company.getById'
import { create } from './controllers/company.create'
import { update } from './controllers/company.update'
import { remove } from './controllers/company.remove'

export const CompanyController = {
  create,
  getById,
  update,
  remove
}
