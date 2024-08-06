import { ZZoning } from '../../../../interfaces-validation/ZZoning'
import { zoningModel } from '../../zoningSchema'

export async function getAll (): Promise<ZZoning[]> {
  try {
    return await zoningModel.find()
  } catch (err) {
    throw new Error(err as string)
  }
}

