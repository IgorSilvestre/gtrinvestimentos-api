import { Router } from 'express'
import { personRouter_v2 } from './routes/person.routes'
import { externalAPIRouterV2 } from './routes/externalApiV2.routes'

export const router_v2 = Router()

router_v2.use('/person', personRouter_v2)
router_v2.use('/external', externalAPIRouterV2)

