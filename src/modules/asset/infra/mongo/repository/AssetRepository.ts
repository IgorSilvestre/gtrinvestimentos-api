import { countTotalDocuments } from "./repositories/assetRepository.countTotalDocuments";
import { get } from "./repositories/assetRepository.get";
import { getById } from "./repositories/assetRepository.getById";
import { search } from "./repositories/assetRepository.search";
import { create } from "./repositories/assetRespository.create";
import { update } from "./repositories/assetRespository.update";
import { remove } from "./repositories/assetRespository.remove";

export const AssetRepository = {
  create,
  countTotalDocuments,
  get,
  getById,
  update,
  search,
  remove,
  // addToSet,
  // updateWithPull,
  // get,
}
