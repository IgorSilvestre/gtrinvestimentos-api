import { Router } from 'express'
import { personRouter } from './routes/person.routes'

export const v2Router = Router()

v2Router.use('/person', personRouter)

