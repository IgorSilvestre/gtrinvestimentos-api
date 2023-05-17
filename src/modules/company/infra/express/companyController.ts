import { getById } from './controllers/companyController.getById'
import { create } from './controllers/companyController.create'
import { update } from './controllers/companyController.update'
import { remove } from './controllers/companyController.remove'
import { getAll } from './controllers/companyController.getAll'

export const CompanyController = {
  create,
  getById,
  getAll,
  update,
  remove
}
