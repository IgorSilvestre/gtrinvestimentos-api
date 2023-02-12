import { IAppError } from '../../shared/interfaces/appError/IAppError'
import { CompanyRepository } from './infra/mongo/CompanyRepository'
import { ZCompany } from './interfaces-validation/ZCompany'
import { DeleteResult } from 'mongodb'

export const CompanyService = {
  store: async (companyDTO: ZCompany): Promise<ZCompany | IAppError> => {
    return await CompanyRepository.create(companyDTO)
  },

  update: async (id: string, data: ZCompany): Promise<ZCompany | IAppError> => {
    // update company data
    return await CompanyRepository.update(id, data)
  },

  getById: async (id: string): Promise<any> => {
    return await CompanyRepository.getById(id)
  },

  delete: async (id: string): Promise<DeleteResult | IAppError> => {
    return await CompanyRepository.delete(id)
  }
}
