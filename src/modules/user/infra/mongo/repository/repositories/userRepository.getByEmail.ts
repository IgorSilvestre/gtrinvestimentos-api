import { ZUser } from "../../../interfaces-validation/ZUser"
import { UserModel } from "../../userSchema"

export async function getByEmail (email: string): Promise<ZUser> {
  try {
    return await UserModel.findOne({ email }).select('+password').lean()
  } catch (err) {
    throw new Error(err as string)
  }
}

