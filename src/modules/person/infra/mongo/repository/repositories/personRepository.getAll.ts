import { ZPerson } from '../../../../interfaces-validation/ZPerson'
import { personModel } from '../../personSchema'

export async function getAll (): Promise<ZPerson | Error> {
  try {
    return await personModel.find().populate('tags').sort({ createdAt: -1 }) as ZPerson
  }
  catch (err) {
    throw new Error(err as string)
  }
}
