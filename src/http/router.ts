import { Router } from 'express'
import { router_v2 } from './routes/v2/router'
import { router_v1 } from './routes/v1/router'

export const router = Router()

router.use('/health', (_, res) => res.send('UP'))

router.use('/v1', router_v1)
router.use('/v2', router_v2)
