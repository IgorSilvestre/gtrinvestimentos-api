import { companyModel, ZCompanyModel } from '../../companySchema'

export async function getAll() {
  try {
    const companies: ZCompanyModel[] = await companyModel
      .find()
      .sort({ label: 1 })
      .collation({ locale: 'en_US', strength: 2 })
      .populate('tags')
      .populate('employees')
    return companies
  } catch (err) {
    throw new Error(err as string)
  }
}
