import { create } from './repositories/companyRespository.create'
import { update } from './repositories/companyRepository.update'
import { getById } from './repositories/companyRepository.getById'
import { remove } from './repositories/companyRepository.remove'
import { getAll } from './repositories/companyRepository.getAll'
import { search } from './repositories/companyRepository.search'

export const CompanyRepository = {
  create,
  update,
  getById,
  search,
  getAll,
  remove,
}
