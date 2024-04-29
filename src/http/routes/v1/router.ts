import { Router } from 'express'

import { companyRouter } from './routes/company.routes'
import { tagRouter } from './routes/tag.routes'
import { personRouter } from './routes/person.routes'
import { externalAPIRouter } from './routes/externalApi.routes'
import { zoningRouter } from './routes/zoning.routes'
import { assetRouter } from './routes/asset.routes'

export const v1Router = Router()

v1Router.use('/company', companyRouter)
v1Router.use('/tag', tagRouter)
v1Router.use('/person', personRouter)
v1Router.use('/externalAPI', externalAPIRouter)
v1Router.use('/zoning', zoningRouter)
v1Router.use('/asset', assetRouter)
