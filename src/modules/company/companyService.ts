import { IAppError } from '../../shared/interfaces/appError/IAppError'
import { CompanyRepository } from './infra/mongo/CompanyRepository'
import { ZCompany } from './interfaces-validation/ZCompany'
import { DeleteResult } from 'mongodb'
import { AppError } from '../../shared/AppError'
import { errorMessageKeys } from '../../shared/keys/errorMessageKeys'

export const CompanyService = {
  create: async (companyDTO: ZCompany): Promise<ZCompany | IAppError> => {
    try {
      return await CompanyRepository.create(companyDTO)
    } catch (err) {
      return new AppError({
        clientMessage: errorMessageKeys.company.notCreated,
        apiError: err,
      })
    }
  },

  update: async (id: string, data: ZCompany): Promise<ZCompany | IAppError> => {
    // update company data
    try {
      const company = await CompanyRepository.update(id, data)
      if (company === null) return new AppError({ clientMessage: 'returned: NULL' })
      return company
    } catch (err) {
      return new AppError({ clientMessage: errorMessageKeys.company.notUpdated, apiError: err })
    }
  },

  getById: async (id: string): Promise<any> => {
    try {
      const company = await CompanyRepository.getById(id)
      if (company === null) return new AppError(
        { clientMessage: errorMessageKeys.company.notFound },
        404)
    } catch (err) {
      return new AppError(
        { clientMessage: errorMessageKeys.company.notFound, apiError: err },
        404,
      )
    }
  },

  remove: async (id: string): Promise<DeleteResult | IAppError> => {
    try {
      return await CompanyRepository.remove(id)
    } catch (err) {
      return new AppError({ clientMessage: errorMessageKeys.company.notRemoved, apiError: err })
    }
  },
}
