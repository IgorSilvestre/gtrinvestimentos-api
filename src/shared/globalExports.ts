import axios from 'axios';
import multer from 'multer'
import https from 'https'

export const multerMemoryStorage = multer({ storage: multer.memoryStorage() })

export const axiosWithoutSSL = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false })
});
