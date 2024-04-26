import { ZTag } from '../../../../interfaces-validation/ZTag'
import { tagModel } from '../../tagSchema'

export async function find(params: any): Promise<ZTag[]> {
  try {
    return (await tagModel
      .find(params)
      .sort({ label: 1 })
      .collation({ locale: 'en_US', strength: 2 })) as ZTag[]
  } catch (err) {
    throw new Error(err as string)
  }
}
