import { companyModel } from '../../companySchema'

export async function addToSet(id: string, data: {}) {
  try {
    return companyModel
      .findOneAndUpdate(
        { _id: id },
        { $addToSet: { ...data }, $set: { updatedAt: new Date() } },
      )
      .populate('tags')
      .populate('employees')
  } catch (err) {
    throw new Error(err as string)
  }
}
