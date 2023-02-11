import { AppError } from '../../../../shared/AppError'
import { IAppError } from '../../../../shared/interfaces/appError/IAppError'
import { ZCompany } from '../../interfaces-validation/ZCompany'
import { companyModel } from './companySchema'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

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

  // update: async ({ id, data }: IUpdateCompany): Promise<ZCompany> => {

  // },

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
