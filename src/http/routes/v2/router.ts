import { Router } from 'express'
import { personRouter_v2 } from './routes/person.routes'
import { externalAPIRouterV2 } from './routes/externalApiV2.routes'
import { authMiddleware } from '../../../middleware/middleware.auth'

export const router_v2 = Router()

router_v2.use('/person', authMiddleware, personRouter_v2)
router_v2.use('/external', authMiddleware, externalAPIRouterV2)

