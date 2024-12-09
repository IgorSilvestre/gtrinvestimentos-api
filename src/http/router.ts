import { Router } from 'express'
import { router_v2 } from './routes/v2/router'
import { router_v1 } from './routes/v1/router'
import { logMiddleware } from '../middleware/middleware.log'
import { authRouter } from './routes/auth.routes'
import { authMiddleware } from '../middleware/middleware.auth'

export const router = Router()

router.use(logMiddleware)

router.use('/health', (_, res) => res.send('UP'))

router.use('/auth', authRouter)

router.use('/v1', authMiddleware, router_v1)
router.use('/v2', authMiddleware, router_v2)
