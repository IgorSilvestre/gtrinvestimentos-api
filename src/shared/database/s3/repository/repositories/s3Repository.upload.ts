import { AppError } from '../../../../AppError'
import { IFile } from '../../../../interfaces/IFile'
import { errorMessageKeys } from '../../../../keys/errorMessageKeys'
import { s3Client } from '../../s3Connection'
import { PutObjectCommand } from '@aws-sdk/client-s3'

export async function upload(bucket: string, file: IFile) {
  const params = {
    Bucket: bucket,
    Key: `${Date.now()}-${file.name}`,
    Body: file.buffer,
    ContentType: file.mimeType,
    // ACL: 'public-read',
  }
  try {
    const data = await s3Client.send(new PutObjectCommand(params))
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
