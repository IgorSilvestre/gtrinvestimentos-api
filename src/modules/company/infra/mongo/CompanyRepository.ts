import { IAppError } from '../../../../shared/interfaces/appError/IAppError'
import { ZCompany } from '../../interfaces-validation/ZCompany'
import { companyModel } from './companySchema'
import { DeleteResult } from 'mongodb'

export const CompanyRepository = {
  create: async (
    companyDTO: ZCompany,
  ): Promise<ZCompany | IAppError> => {
    try {
      return await companyModel.create(companyDTO)
    }
    catch (err) {
      throw new Error(err as string)
    }
  },

  update: async (_id: string, data: ZCompany): Promise<ZCompany | null> => {
    try {
      return companyModel.findOneAndUpdate({ _id }, { $set: data }, { new: true })
    }
    catch (err) {
      throw new Error(err as string)
    }
  },

  getById: async (id: string): Promise<ZCompany> => {
    try {
      return await companyModel.findById(id) as ZCompany
    }
    catch (err) {
      throw new Error(err as string)
    }
  },

  remove: async (_id: string): Promise<DeleteResult> => {
    try {
      return companyModel.deleteOne({ _id })
    }
    catch (err) {
      throw new Error(err as string)
    }
  },
}
