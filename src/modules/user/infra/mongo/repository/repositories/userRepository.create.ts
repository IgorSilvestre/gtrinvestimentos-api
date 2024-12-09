import { ZUser } from "../../../interfaces-validation/ZUser"
import { UserModel } from "../../userSchema"

export async function create(userDTO: ZUser): Promise<ZUser> {
  try {
    return await UserModel.create(userDTO)
  } catch (err) {
    throw new Error(err as string)
  }
}

