import { Router } from 'express'
import { v2Router } from './routes/v2/router'
import { v1Router } from './routes/v1/router'

export const router = Router()

router.use('/health', (_, res) => res.send('UP'))

router.use('/v1', v1Router)
router.use('/v2', v2Router)

