import { getById } from './controllers/companyController.getById'
import { create } from './controllers/companyController.create'
import { update } from './controllers/companyController.update'
import { remove } from './controllers/companyController.remove'

export const CompanyController = {
  create,
  getById,
  update,
  remove
}
