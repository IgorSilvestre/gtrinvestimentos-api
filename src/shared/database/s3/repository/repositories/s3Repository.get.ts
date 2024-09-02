import { AppError } from '../../../../AppError'
import { errorMessageKeys } from '../../../../keys/errorMessageKeys'
import { s3Client } from '../../s3Connection'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'

export async function get(bucket: string) {
  const params = {
    Bucket: bucket,
  }
  try {
    const data = await s3Client.send(new ListObjectsV2Command(params))
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
