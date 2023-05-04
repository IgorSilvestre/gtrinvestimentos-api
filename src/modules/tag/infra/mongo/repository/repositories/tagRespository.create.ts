import { ZTag } from '../../../../interfaces-validation/ZTag'
import { tagModel } from '../../tagSchema'

export async function create (
  tagDTO: ZTag,
): Promise<ZTag> {
  try {
    return await tagModel.create(tagDTO)
  }
  catch (err) {
    throw new Error(err as string)
  }
}
