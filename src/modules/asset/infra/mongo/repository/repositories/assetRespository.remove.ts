import { DeleteResult } from 'mongodb'
import { assetModel } from '../../../../../asset/infra/mongo/assetSchema'

export async function remove(_id: string): Promise<DeleteResult> {
  try {
    return assetModel.deleteOne({ _id })
  } catch (err) {
    throw new Error(err as string)
  }
}

