import { AppError } from "../../../../../../shared/AppError"
import { ZDemand } from "../../../../interfaces-validation/ZDemand"
import { demandModel } from "../../demandSchema"

export async function create(demandDTO: ZDemand): Promise<ZDemand | AppError> {
  try {
    return await demandModel.create(demandDTO)
  } catch (err) {
    throw new Error(err as string)
  }
}
