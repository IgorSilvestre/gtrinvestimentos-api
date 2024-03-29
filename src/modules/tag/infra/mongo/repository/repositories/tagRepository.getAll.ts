import { ZTag } from '../../../../interfaces-validation/ZTag'
import { tagModel } from '../../tagSchema'

export async function getAll(): Promise<ZTag[]> {
  try {
    return (await tagModel
      .find()
      .sort({ label: 1 })
      .collation({ locale: 'en_US', strength: 2 })) as ZTag[]
  } catch (err) {
    throw new Error(err as string)
  }
}
