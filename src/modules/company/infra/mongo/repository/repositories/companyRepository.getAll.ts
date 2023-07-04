import { companyModel, ZCompanyModel } from '../../companySchema'

export async function getAll () {
  try {
    const companies: ZCompanyModel[] = await companyModel.find().sort({ createdAt: -1 }).populate('tags').populate('employees')
    return companies
  }
  catch (err) {
    throw new Error(err as string)
  }
}
