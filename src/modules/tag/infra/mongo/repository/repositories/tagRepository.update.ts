import { ZTag } from '../../../../interfaces-validation/ZTag'
import { tagModel } from '../../tagSchema'

export async function update (_id: string, data: ZTag): Promise<ZTag | null> {
  try {
    return tagModel.findOneAndUpdate({ _id }, { $set: { ...data, lastUpdated: Date.now() } }, { new: true })
  }
  catch (err) {
    throw new Error(err as string)
  }
}
