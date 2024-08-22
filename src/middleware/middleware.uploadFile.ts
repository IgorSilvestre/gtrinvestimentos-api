import { Request, Response, NextFunction } from 'express'
import { multerMemoryStorage } from '../shared/globalExports'
import { errorMessageKeys } from '../shared/keys/errorMessageKeys'

export function uploadFileMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const upload = multerMemoryStorage.single('file')

  upload(req, res, (err: any) => {
    if (err) {
      return res
        .status(400)
        .send({
          clientMessage: errorMessageKeys.cantUploadFileMiddleware,
          apiError: err.message,
        })
    }
    next()
  })
}
