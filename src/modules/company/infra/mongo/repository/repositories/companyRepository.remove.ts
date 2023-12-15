import { DeleteResult } from 'mongodb'
import { companyModel } from '../../companySchema'

export async function remove(_id: string): Promise<DeleteResult> {
  try {
    return companyModel.deleteOne({ _id })
  } catch (err) {
    throw new Error(err as string)
  }
}
