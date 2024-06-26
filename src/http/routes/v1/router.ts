import { Router } from 'express'

import { companyRouter } from './routes/company.routes'
import { tagRouter } from './routes/tag.routes'
import { personRouter } from './routes/person.routes'
import { externalAPIRouter } from './routes/externalApi.routes'
import { zoningRouter } from './routes/zoning.routes'
import { assetRouter } from './routes/asset.routes'

export const router_v1 = Router()

router_v1.use('/company', companyRouter)
router_v1.use('/tag', tagRouter)
router_v1.use('/person', personRouter)
router_v1.use('/externalAPI', externalAPIRouter)
router_v1.use('/zoning', zoningRouter)
router_v1.use('/asset', assetRouter)
