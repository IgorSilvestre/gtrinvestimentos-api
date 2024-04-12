import { AppError } from '../../../../../../shared/AppError'
import { assetModel } from '../../assetSchema'

export async function countTotalDocuments() {
  try {
    return await assetModel.countDocuments()
  } catch (err) {
    console.log(new AppError({ apiError: err, clientMessage: '' }))
    return 0
  }
}
