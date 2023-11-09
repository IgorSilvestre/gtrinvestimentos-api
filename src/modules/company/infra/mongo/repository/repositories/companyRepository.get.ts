import { defaultValues } from '../../../../../../shared/defaultValues'
import { IPaginationParams } from '../../../../../../shared/interfaces/IPaginationsParams'
import { companyModel } from '../../companySchema'
import { ICompanyDocument } from '../../../../interfaces-validation/ICompanyModel'

export async function get(
  paginationParams: IPaginationParams,
): Promise<ICompanyDocument[]> {
  const page = paginationParams?.page || defaultValues.paginationPage
  const limit = paginationParams?.limit || defaultValues.paginationLimit

  try {
    const companies = await companyModel
      .find()
      .sort({ label: 1 })
      .collation({ locale: 'en_US', strength: 2 })
      .populate('tags')
      .populate('employees')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return companies
  } catch (err) {
    throw new Error(err as string)
  }
}
