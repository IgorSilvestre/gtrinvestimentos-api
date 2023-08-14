import { getById } from './controllers/companyController.getById'
import { create } from './controllers/companyController.create'
import { update } from './controllers/companyController.update'
import { remove } from './controllers/companyController.remove'
import { getAll } from './controllers/companyController.getAll'
import { search } from './controllers/companyController.search'
import { getAllForSelect } from './controllers/companyController.getForSelect'
import { registerEmployee } from './controllers/companyController.registerEmployee'

export const CompanyController = {
  create,
  getById,
  getAll,
  search,
  getAllForSelect,
  registerEmployee,
  update,
  remove
}
