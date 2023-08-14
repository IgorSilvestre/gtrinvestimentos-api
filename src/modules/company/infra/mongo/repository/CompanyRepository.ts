import { create } from './repositories/companyRespository.create'
import { update } from './repositories/companyRepository.update'
import { getById } from './repositories/companyRepository.getById'
import { remove } from './repositories/companyRepository.remove'
import { getAll } from './repositories/companyRepository.getAll'
import { search } from './repositories/companyRepository.search'
import { addToSet } from './repositories/companyRepository.addToSet'
import { updateWithPull } from './repositories/companyRepository.updateWithPull'

export const CompanyRepository = {
  create,
  update,
  addToSet,
  updateWithPull,
  getById,
  search,
  getAll,
  remove,
}
