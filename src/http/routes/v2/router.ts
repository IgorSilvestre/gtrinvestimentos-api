import { Router } from 'express'
import { personRouter_v2 } from './routes/person.routes'

export const router_v2 = Router()

router_v2.use('/person', personRouter_v2)

