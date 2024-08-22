import { get } from './repositories/s3Repository.get'
import { upload } from './repositories/s3Repository.upload'

export const s3Repository = {
  get,
  upload,
}
