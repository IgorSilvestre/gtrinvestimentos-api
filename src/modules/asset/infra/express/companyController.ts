import { getById } from './controllers/companyController.getById'
import { create } from './controllers/companyController.create'
import { update } from './controllers/companyController.update'
import { remove } from './controllers/companyController.remove'
import { get } from './controllers/companyController.get'
import { search } from './controllers/companyController.search'
import { searchForSelect } from './controllers/companyController.searchForSelect'
import { registerEmployee } from './controllers/companyController.registerEmployee'

export const CompanyController = {
  create,
  getById,
  get,
  search,
  searchForSelect,
  registerEmployee,
  update,
  remove,
}
