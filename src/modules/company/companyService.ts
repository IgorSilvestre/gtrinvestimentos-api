import { AppError } from '../../shared/AppError'
import { IAppError } from '../../shared/interfaces/IAppError'
import { CompanyRepository } from './infra/mongo/CompanyRepository'
import { IUpdateCompany } from './interfaces-validation/IUpdateCompany'
import { ZCompany } from './interfaces-validation/ZCompany'

export const CompanyService = {
  store: async (companyDTO: ZCompany): Promise<ZCompany | IAppError> => {
      const company = await CompanyRepository.create(companyDTO)
      if (!company) return new AppError('Company not created')
      
      return company
    },

//   update: async ({
//     id,
//     data,
//   }: IUpdateCompany): Promise<ZCompany | unknown> => {
//     // check if company exists
//     try {
//         const company = await CompanyRepository.getById(id)
//         if (!company) throw new AppError('No company found by that ID', 404)
//     } catch (err) {
//         throw new AppError(err)
//     }
//     // update company data
//     try {
//       return await CompanyRepository.update({ id, data })
//     } catch (err) {
//         throw new AppError(err)
//     }
//   },

//   getById: async (id: string): Promise<any> => {
//     return await CompanyRepository.getById(id)
//     // if (!company) return new AppError('Company not found', 404)
//     // return company
//   }, 
}
