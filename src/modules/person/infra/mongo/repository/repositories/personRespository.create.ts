import { ZPerson } from '../../../../interfaces-validation/ZPerson'
import { personModel } from '../../personSchema'

export async function create (
  personDTO: ZPerson,
): Promise<ZPerson> {
  try {
    return await personModel.create(personDTO)
  }
  catch (err) {
    throw new Error(err as string)
  }
}
