import { Request, Response, Router } from 'express'
import { uploadFileMiddleware } from '../../../../middleware/middleware.uploadFile'
import { AppError } from '../../../../shared/AppError'
import { bucketKeys } from '../../../../shared/keys/bucketKeys'
import { s3Repository } from '../../../../shared/database/s3/repository/s3Repository'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

export const fileRouter = Router()

fileRouter.post(
  '/',
  uploadFileMiddleware,
  async (req: Request, res: Response) => {
    if (!req.file)
      res.status(400).json({ error: errorMessageKeys.noFileInRequest })

    const file = {
      name: req.file.originalname,
      buffer: req.file.buffer,
      mimeType: req.file.mimetype,
    }
    const bucketName = bucketKeys.publicImages
    const fileLocation = await s3Repository.upload(bucketName, file)

    if (fileLocation instanceof AppError)
      res.status(fileLocation.status).json({ error: fileLocation.message })

    res.status(200).json({ fileAddress: fileLocation })
  },
)

fileRouter.get('/', async (req, res) => {
  const files = await s3Repository.get(bucketKeys.publicImages)

  if (files instanceof AppError)
    res.status(files.status).json({ error: files.message })

  res.status(200).json({ fileAddress: files })
})
