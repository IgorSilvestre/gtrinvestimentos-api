import { AppError } from '../../../../shared/AppError'
import { IAppError } from '../../../../shared/interfaces/IAppError'
import { IUpdateCompany } from '../../interfaces-validation/IUpdateCompany'
import { ZCompany } from '../../interfaces-validation/ZCompany'
import { companyModel } from './companySchema'

export const CompanyRepository = {
  create: async (companyDTO: ZCompany): Promise<ZCompany | IAppError | null> => {
    try {
      return await companyModel.create(companyDTO)
    } catch (err) {
      return new AppError({ clientMessage: 'Company not created', appError: err})
    }
  },

  // update: async ({ id, data }: IUpdateCompany): Promise<ZCompany> => {
    
  // },

  // getById: async (id: string): Promise<ZCompany | IAppError | null> => {
  //   try {
  //     return await companyModel.findById(id)
  //   } catch (err) {
  //     return new AppError({ clientMessage: 'Company not found!', appError: err}, 404)
  //   }
  // }
}
