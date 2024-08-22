import { Request } from 'express';

export interface MulterRequest extends Request {
    // @ts-ignore
    file: Express.Multer.File
}

