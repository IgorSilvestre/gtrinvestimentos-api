import { companyModel, ZCompanyModel } from '../../companySchema'

export async function getAll () {
  try {
    const companies: ZCompanyModel[] = await companyModel.find().populate('tags');
    console.log('companies', companies)
    return companies
  }
  catch (err) {
    throw new Error(err as string)
  }
}
