import { companyModel, ZCompanyModel } from '../../companySchema'

export async function search (searchParams: unknown) {
  try {
    const companies: ZCompanyModel[] = await companyModel
      .find({tags: { $all: searchParams?.tags}})
      .sort({ createdAt: -1 })
      .populate('tags')
      .populate('employees')
    
    return companies
  }
  catch (err) {
    throw new Error(err as string)
  }
}
