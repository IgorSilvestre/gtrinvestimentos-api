import { companyModel, ZCompanyModel } from '../../companySchema'

export async function getById (id: string): Promise<ZCompanyModel> {
  try {
    return await companyModel.findById(id) as ZCompanyModel
  }
  catch (err) {
    throw new Error(err as string)
  }
}
