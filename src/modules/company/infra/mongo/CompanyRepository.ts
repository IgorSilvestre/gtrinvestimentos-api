import { AppError } from '../../../../shared/AppError'
import { IAppError } from '../../../../shared/interfaces/appError/IAppError'
import { ZCompany } from '../../interfaces-validation/ZCompany'
import { companyModel } from './companySchema'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { ZUpdateCompany } from '../../interfaces-validation/ZUpdateCompany'

export const CompanyRepository = {
  create: async (
    companyDTO: ZCompany,
  ): Promise<ZCompany | IAppError> => {
    try {
      return await companyModel.create(companyDTO)
    } catch (err) {
      return new AppError({
        clientMessage: errorMessageKeys.company.notCreated,
        apiError: err,
      })
    }
  },

  update: async ({ id, data }: ZUpdateCompany): Promise< ZCompany | IAppError> => {
    try {
      const company = await companyModel.findOneAndUpdate({ _id: id }, { $set: data }, { new: true })
      if (company === null) throw new Error('returned: null')  // Intentionally throwing error, so it won't return NULL
      return company
    }
    catch (err) {
      return new AppError({ clientMessage: errorMessageKeys.company.notUpdated, apiError: err})
    }
  },

  getById: async (id: string): Promise<ZCompany | IAppError> => {
    try {
      return await companyModel.findById(id) as ZCompany
    } catch (err) {
      return new AppError(
        { clientMessage: errorMessageKeys.company.notFound, apiError: err },
        404,
      )
    }
  },
}
