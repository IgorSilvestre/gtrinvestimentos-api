import { ZZoning } from '../../../../interfaces-validation/ZZoning'
import { zoningModel } from '../../zoningSchema'

export async function create(zoningDTO: ZZoning): Promise<ZZoning> {
  try {
    return await zoningModel.create(zoningDTO)
  } catch (err) {
    throw new Error(err as string)
  }
}
