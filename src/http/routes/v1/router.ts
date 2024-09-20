import { Router } from 'express'

import { companyRouter } from './routes/company.routes'
import { tagRouter } from './routes/tag.routes'
import { personRouter } from './routes/person.routes'
import { externalAPIRouter } from './routes/externalApi.routes'
import { zoningRouter } from './routes/zoning.routes'
import { scriptRouter } from './routes/script.routes'
import { assetRouter } from './routes/asset.routes'
import { fileRouter } from './routes/file.routes'

export const router_v1 = Router()

router_v1.use('/company', companyRouter)
router_v1.use('/tag', tagRouter)
router_v1.use('/person', personRouter)
router_v1.use('/externalAPI', externalAPIRouter)
router_v1.use('/zoning', zoningRouter)
router_v1.use('/asset', assetRouter)
router_v1.use('/file', fileRouter)
router_v1.use('/script', scriptRouter)
