import { ZPerson } from '../../../../interfaces-validation/ZPerson'
import { personModel } from '../../personSchema'

export async function getAll(): Promise<ZPerson | Error> {
  try {
    return (await personModel
      .find()
      .populate('tags')
      .populate('company')
      .sort({ label: 1 })
      .collation({ locale: 'en_US', strength: 2 })) as ZPerson
  } catch (err) {
    throw new Error(err as string)
  }
}
