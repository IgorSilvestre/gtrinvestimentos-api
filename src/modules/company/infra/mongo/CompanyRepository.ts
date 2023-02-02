import { ZCompany } from '../../interfaces-validation/companyValidation'
import { companyModel } from './companySchema'

export const CompanyRepository = {
  create: async (companyDTO: ZCompany): Promise<ZCompany> => {
    const company = await companyModel.create(companyDTO)
    return company
  }
}
