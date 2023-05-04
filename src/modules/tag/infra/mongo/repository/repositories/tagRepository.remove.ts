import { DeleteResult } from 'mongodb'
import { tagModel } from '../../tagSchema'

export async function remove (_id: string): Promise<DeleteResult> {
  try {
    return tagModel.deleteOne({ _id })
  }
  catch (err) {
    throw new Error(err as string)
  }
}
