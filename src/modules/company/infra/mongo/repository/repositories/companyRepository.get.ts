import { defaultValues } from '../../../../../../shared/defaultValues'
import { IPaginationParams } from '../../../../../../shared/interfaces/IPaginationsParams'
import { companyModel } from '../../companySchema'
import { ICompanyDocument } from '../../../../interfaces-validation/ICompanyModel'

export async function get(
  paginationParams: IPaginationParams,
): Promise<ICompanyDocument[]> {
  let { page, limit } = paginationParams

  if (!page) page = defaultValues.paginationPage
  if (!limit) limit = defaultValues.paginationLimit

  try {
    const companies = await companyModel
      .find()
      .sort({ label: 1 })
      .collation({ locale: 'en_US', strength: 2 })
      .populate('tags')
      .populate('employees')
      .skip((page - 1) * limit)
      .limit(limit)

    return companies
  } catch (err) {
    throw new Error(err as string)
  }
}
