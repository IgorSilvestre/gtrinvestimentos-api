import { AppError } from '../../../../AppError'
import { errorMessageKeys } from '../../../../keys/errorMessageKeys'
import { s3 } from '../../s3Connection'

export async function get(bucket: string) {
  const params = {
    Bucket: bucket,
  }
  try {
    const data = await s3.listObjectsV2(params).promise()
    return data.Contents
  } catch (error) {
    return new AppError(
      {
        apiError: error,
        clientMessage: errorMessageKeys.database.aws.s3.cantGet,
      },
      500,
    )
  }
}
