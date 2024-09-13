import { AppError } from "../../../../shared/AppError"
import { errorMessageKeys } from "../../../../shared/keys/errorMessageKeys"
import { DeleteResult } from 'mongodb'
import { AssetRepository } from "../../infra/mongo/repository/AssetRepository"

export async function remove(id: string): Promise<DeleteResult | AppError> {
  try {
    return (await AssetRepository.remove(id)) as DeleteResult
  } catch (err) {
    return new AppError({
      clientMessage: errorMessageKeys.company.notRemoved,
      apiError: err,
    })
  }
}
