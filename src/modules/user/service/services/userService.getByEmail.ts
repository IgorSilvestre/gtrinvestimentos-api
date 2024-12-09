import { AppError } from "../../../../shared/AppError"
import { errorMessageKeys } from "../../../../shared/keys/errorMessageKeys"
import { ZUser } from "../../infra/interfaces-validation/ZUser"
import { UserRepository } from "../../infra/mongo/repository/userRepository"

export async function getByEmail (email: string): Promise<ZUser | AppError> {
  try {
    return await UserRepository.getByEmail(email)
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.user.notFound,
      apiError: err,
    })
  }
}

