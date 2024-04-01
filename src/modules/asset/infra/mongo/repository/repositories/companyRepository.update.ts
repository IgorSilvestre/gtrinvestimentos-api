import { ZCompany } from '../../../../interfaces-validation/ZCompany'
import { companyModel } from '../../assetSchema'

export async function update(_id: string, data: {}): Promise<ZCompany | null> {
  try {
    return companyModel
      .findOneAndUpdate(
        { _id },
        { $set: { ...data, lastUpdated: Date.now() } },
        { new: true },
      )
      .populate('tags')
      .populate('employees')
  } catch (err) {
    throw new Error(err as string)
  }
}
