import { Router } from 'express'

import { companyRouter } from './routes/company.routes'
import { tagRouter } from './routes/tag.routes'
import { personRouter } from './routes/person.routes'
import { externalAPIRouter } from './routes/externalApi.routes'
import { demandRouter } from './routes/demand.routes'

export const router = Router()

router.use('/company', companyRouter)
router.use('/tag', tagRouter)
router.use('/person', personRouter)
router.use('/externalAPI', externalAPIRouter)
router.use('/demand', demandRouter)
