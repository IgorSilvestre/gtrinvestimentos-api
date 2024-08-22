import { AppError } from '../../../../AppError'
import { IFile } from '../../../../interfaces/IFile'
import { errorMessageKeys } from '../../../../keys/errorMessageKeys'
import { s3 } from '../../s3Connection'

export async function upload(bucket: string, file: IFile) {
  const params = {
    Bucket: bucket,
    Key: `${Date.now()}-${file.name}`,
    Body: file.buffer,
    ContentType: file.mimeType,
    // ACL: 'public-read',
  }
  try {
    const data = await s3.upload(params).promise()
    return data.Location
  } catch (error) {
    return new AppError(
      {
        apiError: error,
        clientMessage: errorMessageKeys.database.aws.s3.cantUpload,
      },
      500,
    )
  }
}
