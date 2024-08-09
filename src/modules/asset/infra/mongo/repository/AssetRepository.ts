import { countTotalDocuments } from "./repositories/assetRepository.countTotalDocuments";
import { get } from "./repositories/assetRepository.get";
import { getById } from "./repositories/assetRepository.getById";
import { create } from "./repositories/assetRespository.create";

export const AssetRepository = {
  create,
  countTotalDocuments,
  get,
  getById,
  // update,
  // addToSet,
  // updateWithPull,
  // search,
  // get,
  // remove,
}
