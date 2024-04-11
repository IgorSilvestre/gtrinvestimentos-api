import { ZAsset } from '../../../../interfaces-validation/ZAsset'
import { assetModel } from '../../assetSchema'

export async function create(assetDTO: ZAsset): Promise<ZAsset> {
  try {
    return await assetModel.create(assetDTO) as unknown as ZAsset
  } catch (err) {
    throw new Error(err as string)
  }
}
