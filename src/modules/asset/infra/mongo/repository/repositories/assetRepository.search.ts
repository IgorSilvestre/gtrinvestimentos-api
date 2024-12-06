import { assetModel } from '../../assetSchema'

async function countTotalAssets(params: Record<string, any>) {
  try {
    return assetModel.find(params).countDocuments()
  } catch (err) {
    console.log(new Error(err as string))
    return 0
  }
}
async function searchAssets(
  params: Record<string, any>,
) {
  try {
    const data = await assetModel
      .find(params)
      .sort({ createdAt: -1 })
      .populate('tags')
      .populate('zoning')
      .populate('contact')
      .lean()

    return data
  } catch (err) {
    throw new Error(err as string)
  }
}

export async function search(
  params: Record<string, any>,
): Promise<any> {
  const totalAssets = await countTotalAssets(params)
  const assets = await searchAssets(params)
  return {
    data: assets, 
    totalAssets,
  }
}
