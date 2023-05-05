import { Router } from 'express'

import { companyRouter } from './routes/company.routes'
import { tagRouter } from './routes/tag.routes'
import { personRouter } from './routes/person.routes'

export const router = Router()

router.get('/', (req, res) => res.status(200).send('UP'))

router.use('/company', companyRouter)
router.use('/tag', tagRouter)
router.use('/person', personRouter)
