import { AppError } from "../../../../shared/AppError";
import { errorMessageKeys } from "../../../../shared/keys/errorMessageKeys";
import { DemandRepository } from "../../infra/mongo/repository/demandRepository";
import { ZDemand } from "../../interfaces-validation/ZDemand";

export async function create (demandDTO: ZDemand) {
  try {
    return (await DemandRepository.create(demandDTO))
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.demand.notCreated,
      apiError: err,
    })
  }
}
