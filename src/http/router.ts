import { Router } from 'express'

import { companyRouter } from './routes/company.routes'
import { tagRouter } from './routes/tag.routes'
import { personRouter } from './routes/person.routes'
import { externalApiController } from '../modules/externalAPI/infra/express/externalApiController'
import { externalAPIRouter } from './routes/externalApi.routes'

export const router = Router()

router.use('/company', companyRouter)
router.use('/tag', tagRouter)
router.use('/person', personRouter)
router.use('/externalAPI', externalAPIRouter)
