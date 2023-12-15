import { defaultValues } from '../../../../../../shared/defaultValues'
import { IPaginationParams } from '../../../../../../shared/interfaces/IPaginationsParams'
import { companyModel } from '../../companySchema'
import { ICompaniesPaginated } from '../../../../interfaces-validation/ICompaniesPaginated'
import { AppError } from '../../../../../../shared/AppError'
import { ICompanyDocument } from '../../../../interfaces-validation/ICompanyModel'
import { CACHE } from '../../../../../../shared/cache'

// TODO This needs to be its own repository
async function countTotalCompanies() {
  try {
    return await companyModel.countDocuments()
  } catch (err) {
    console.log(new AppError({ apiError: err, clientMessage: '' }))
    return 0
  }
}

async function fetchCompanies(page: number, limit: number) {
  const key = `company-get-${page}-${limit}`
  // Try to get the data from cache
  const cachedData = CACHE.get(key)
  if (cachedData) return cachedData as ICompanyDocument[]

  try {
    const data = await companyModel
      .find()
      .sort({ createdAt: -1 })
      .collation({ locale: 'en_US', strength: 2 })
      .populate('tags')
      .populate('employees')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    CACHE.set(key, data, 300)

    return data
  } catch (err) {
    throw new Error(err as string)
  }
}
// TODO !! This is supposed to be in the service, not in the repository
export async function get(
  paginationParams: IPaginationParams,
): Promise<ICompaniesPaginated> {
  const limit =
    paginationParams?.limit && paginationParams?.limit > 0
      ? paginationParams?.limit
      : defaultValues.paginationLimit

  const totalCompanies = await countTotalCompanies()
  const totalPages = Math.ceil(totalCompanies / limit)

  const page =
    paginationParams?.page && paginationParams?.page <= totalPages
      ? paginationParams?.page
      : defaultValues.paginationPage

  const previousPage = page > 1 ? page - 1 : null
  const nextPage = page < totalPages ? page + 1 : null
  const companies = await fetchCompanies(page, limit)
  return {
    data: companies,
    totalCompanies,
    totalPages,
    previousPage,
    nextPage,
  }
}
