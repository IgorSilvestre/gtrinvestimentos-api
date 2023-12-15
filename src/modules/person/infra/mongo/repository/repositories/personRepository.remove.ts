import { DeleteResult } from 'mongodb'
import { personModel } from '../../personSchema'

export async function remove(_id: string): Promise<DeleteResult> {
  try {
    return personModel.deleteOne({ _id })
  } catch (err) {
    throw new Error(err as string)
  }
}
