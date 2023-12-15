import { companyModel } from '../../companySchema'

export function updateWithPull(id: string, data: {}) {
  try {
    return companyModel
      .findOneAndUpdate(
        { _id: id },
        { $pull: { ...data }, $set: { updatedAt: new Date() } },
      )
      .populate('tags')
      .populate('employees')
  } catch (err) {
    throw new Error(err as string)
  }
}
