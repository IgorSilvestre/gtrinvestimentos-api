import multer from 'multer'

export const multerMemoryStorage = multer({ storage: multer.memoryStorage() })
