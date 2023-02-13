import { ZCompany } from '../../../../interfaces-validation/ZCompany'
import { companyModel } from '../../companySchema'

export async function getById (id: string): Promise<ZCompany> {
  try {
    return await companyModel.findById(id) as ZCompany
  }
  catch (err) {
    throw new Error(err as string)
  }
}