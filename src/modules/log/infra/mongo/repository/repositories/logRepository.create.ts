import { ZLog } from "../../../interfaces-validation/ZLog"
import { logModel } from "../../logSchema"

export async function create(logDTO: ZLog): Promise<ZLog> {
  try {
    return await logModel.create(logDTO)
  } catch (err) {
    throw new Error(err as string)
  }
}

