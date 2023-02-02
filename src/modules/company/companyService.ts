import { AppError } from '../../shared/AppError'
import { CompanyRepository } from './infra/mongo/CompanyRepository'
import { IUpdateCompany } from './interfaces-validation/IUpdateCompany'
import { ZCompany } from './interfaces-validation/ZCompany'

export const CompanyService = {
  store: async (companyDTO: ZCompany): Promise<ZCompany> => {
      const company = await CompanyRepository.create(companyDTO)
      if (!company) throw new AppError('Company not created')
      
      return company
    }

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

//   getById: async (id: string): Promise<ZCompany> => {
//     try {
//       return await CompanyRepository.getById(id)
//     } catch (err) {}
//   }, 
}
