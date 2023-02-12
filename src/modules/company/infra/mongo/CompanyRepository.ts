import { AppError } from '../../../../shared/AppError'
import { IAppError } from '../../../../shared/interfaces/appError/IAppError'
import { ZCompany } from '../../interfaces-validation/ZCompany'
import { companyModel } from './companySchema'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { DeleteResult } from 'mongodb'

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

  update: async (_id: string, data: ZCompany): Promise<ZCompany | IAppError> => {
    try {
      const company = await companyModel.findOneAndUpdate({ _id }, { $set: data }, { new: true })
      if (company === null) return new AppError({ clientMessage: 'returned: NULL' })
      return company
    } catch (err) {
      return new AppError({ clientMessage: errorMessageKeys.company.notUpdated, apiError: err })
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

  delete: async (_id: string): Promise<DeleteResult | IAppError> => {
    try {
      return companyModel.deleteOne({ _id })
    } catch (err) {
      return new AppError({ clientMessage: errorMessageKeys.company.notDeleted, apiError: err })
    }

  },
}
