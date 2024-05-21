import { Router } from 'express'
import { PersonController_v2 } from '../../../../modules/person/v2/infra/express/personController'

export const personRouter_v2 = Router()

personRouter_v2.get('/partners', PersonController_v2.getPartners)

