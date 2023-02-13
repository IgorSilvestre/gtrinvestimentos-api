import { ZCompany } from '../../../../interfaces-validation/ZCompany'
import { companyModel } from '../../companySchema'

export async function update (_id: string, data: ZCompany): Promise<ZCompany | null> {
  try {
    return companyModel.findOneAndUpdate({ _id }, { $set: data }, { new: true })
  }
  catch (err) {
    throw new Error(err as string)
  }
}