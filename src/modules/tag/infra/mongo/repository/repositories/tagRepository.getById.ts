import { ZTag } from '../../../../interfaces-validation/ZTag'
import { tagModel } from '../../tagSchema'

export async function getById(id: string): Promise<ZTag> {
  try {
    return (await tagModel.findById(id)) as ZTag
  } catch (err) {
    throw new Error(err as string)
  }
}
