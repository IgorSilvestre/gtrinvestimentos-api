import { AppError } from '../../../../shared/AppError'
import { IUpdateCompany } from '../../interfaces-validation/IUpdateCompany'
import { ZCompany } from '../../interfaces-validation/ZCompany'
import { companyModel } from './companySchema'

export const CompanyRepository = {
  create: async (companyDTO: ZCompany): Promise<ZCompany> => {
    try {
      return await companyModel.create(companyDTO)
    } catch (err) {
      throw new AppError(err)
    }
  },

  // update: async ({ id, data }: IUpdateCompany): Promise<ZCompany> => {
    
  // },

  // getById: async (id: string): Promise<any> => {
  //   return await companyModel.findById(id)
  // }
}
