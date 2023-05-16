import { ZPerson } from '../../../../interfaces-validation/ZPerson'
import { personModel } from '../../personSchema'

export async function update (_id: string, data: ZPerson): Promise<ZPerson | null> {
  try {
    return personModel.findOneAndUpdate({ _id }, { $set: { ...data, lastUpdated: Date.now() } }, { new: true })
  }
  catch (err) {
    throw new Error(err as string)
  }
}
