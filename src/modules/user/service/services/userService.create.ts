import { AppError } from "../../../../shared/AppError"
import { errorMessageKeys } from "../../../../shared/keys/errorMessageKeys"
import { ZUser } from "../../infra/interfaces-validation/ZUser"
import { UserRepository } from "../../infra/mongo/repository/userRepository"
import bcrypt from 'bcrypt'

export async function create(userDTO: ZUser): Promise<ZUser | AppError> {
  userDTO.password = await bcrypt.hash(userDTO.password, 10)

  try {
    return await UserRepository.create(userDTO)
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.user.notCreated,
      apiError: err,
    })
  }
}

