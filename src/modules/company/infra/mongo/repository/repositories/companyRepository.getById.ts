import { ICompanyDocument } from '../../../../interfaces-validation/ICompanyModel'
import { companyModel } from '../../companySchema'

export async function getById(id: string): Promise<ICompanyDocument> {
  try {
    return (await companyModel
      .findById(id)
      .populate('tags')
      .populate('employees')
      .lean()) as ICompanyDocument
  } catch (err) {
    throw new Error(err as string)
  }
}
