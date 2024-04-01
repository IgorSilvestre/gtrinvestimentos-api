import { ZCompany } from '../../../../interfaces-validation/ZCompany'
import { companyModel } from '../../assetSchema'

export async function create(companyDTO: ZCompany): Promise<ZCompany> {
  try {
    return await companyModel.create(companyDTO)
  } catch (err) {
    throw new Error(err as string)
  }
}
