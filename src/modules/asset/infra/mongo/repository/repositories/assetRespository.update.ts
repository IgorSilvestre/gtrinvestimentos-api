import { ZAsset } from "../../../../interfaces-validation/ZAsset"
import { assetModel } from "../../assetSchema"

export async function update(_id: string, data: {}): Promise<ZAsset | null> {
  try {
    return assetModel
      .findOneAndUpdate(
        { _id },
        { $set: { ...data, lastUpdated: Date.now() } },
        { new: true },
      )
      .populate('tags')
      .populate('zoning')
  } catch (err) {
    throw new Error(err as string)
  }
}
