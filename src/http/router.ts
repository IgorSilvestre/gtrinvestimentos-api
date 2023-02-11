import { Router } from 'express'

import { companyRouter } from './routes/company.routes'

export const router = Router()

router.get('/', (req, res) => res.status(200).send('UP'))

router.use('/company', companyRouter)
