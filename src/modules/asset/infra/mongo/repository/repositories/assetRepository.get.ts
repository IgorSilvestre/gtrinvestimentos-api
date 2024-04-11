import { assetModel } from '../../assetSchema'
import { IAssetDocument } from '../../../../interfaces-validation/IAssetDocument'

export async function get(
  search: Record<string, any>,
  page: number,
  limit: number,
  count: boolean = false,
): Promise<IAssetDocument[] | number> {
  if (count) {
    try {
      const data = await assetModel
        .find(search)
        .sort({ createdAt: -1 })
        // .collation({ locale: 'en_US', strength: 2 })
        .populate('tags')
        .populate('partner')
        .populate('zoning')
        .skip((page - 1) * limit)
        .limit(limit)
        .countDocuments()

      return data as number
    } catch (err) {
      throw new Error(err as string)
    }
  }

  try {
    const data = await assetModel
      .find(search)
      .sort({ createdAt: -1 })
      .populate('tags')
      .populate('partner')
      .populate('zoning')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return data
  } catch (err) {
    throw new Error(err as string)
  }
}
