import { IAssetDocument } from "../../../../interfaces-validation/IAssetDocument"
import { assetModel } from "../../assetSchema"

export async function getById(id: string): Promise<IAssetDocument> {
  try {
    return (await assetModel
      .findById(id)
      .populate('tags')
      .lean()) as IAssetDocument
  } catch (err) {
    throw new Error(err as string)
  }
}
