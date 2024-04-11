import { Router } from 'express'

import { companyRouter } from './routes/company.routes'
import { tagRouter } from './routes/tag.routes'
import { personRouter } from './routes/person.routes'
import { externalAPIRouter } from './routes/externalApi.routes'
import { zoningRouter } from './routes/zoning.routes'
import { assetRouter } from './routes/asset.routes'

export const router = Router()

router.use('/health', (_, res) => res.send('UP'))


router.use('/company', companyRouter)
router.use('/tag', tagRouter)
router.use('/person', personRouter)
router.use('/externalAPI', externalAPIRouter)
router.use('/zoning', zoningRouter)
router.use('/asset', assetRouter)
