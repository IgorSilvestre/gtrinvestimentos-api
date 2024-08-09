import { normalizeTags } from '../../../shared/functions/normalizeTags'
import { parseISODateToBrazilSTD } from '../../../shared/functions/parseISODateToBrazilSTD'
import { ZTag } from '../../tag/interfaces-validation/ZTag'
import { IAssetDocument } from './IAssetDocument'

export function normalizeAssets(
  assets: IAssetDocument | IAssetDocument[],
) {
  assets = Array.isArray(assets) ? assets : [assets]
  let assetsNormalized = assets.map((asset) => ({
    ...asset,
    tags: normalizeTags(asset.tags as unknown as ZTag[]),
    createdAt: parseISODateToBrazilSTD(asset?.createdAt?.toISOString()),
    lastUpdated: parseISODateToBrazilSTD(asset?.lastUpdated?.toISOString()),
  }))

  return assetsNormalized
}

