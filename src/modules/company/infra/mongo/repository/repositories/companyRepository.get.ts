import { defaultValues } from '../../../../../../shared/defaultValues'
import { IPaginationParams } from '../../../../../../shared/interfaces/IPaginationsParams'
import { companyModel } from '../../companySchema'
import { ICompaniesPaginated } from '../../../../interfaces-validation/ICompaniesPaginated'


export async function get(
  paginationParams: IPaginationParams,
): Promise<ICompaniesPaginated> {
  const page = paginationParams?.page || defaultValues.paginationPage
  const limit = paginationParams?.limit || defaultValues.paginationLimit

  const totalCompanies = await companyModel.countDocuments()
  const totalPages = Math.ceil(totalCompanies / limit)

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

    return {
      data: companies,
      totalCompanies,
      totalPages,
    }
  } catch (err) {
    throw new Error(err as string)
  }
}
