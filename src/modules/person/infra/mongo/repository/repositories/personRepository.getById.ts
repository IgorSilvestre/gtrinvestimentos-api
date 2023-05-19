import { ZPerson } from '../../../../interfaces-validation/ZPerson'
import { personModel } from '../../personSchema'

export async function getById (id: string): Promise<ZPerson> {
  try {
    return await personModel.findById(id).populate('tags') as ZPerson
  }
  catch (err) {
    throw new Error(err as string)
  }
}
