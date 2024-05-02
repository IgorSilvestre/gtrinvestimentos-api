import { Router } from 'express'
import { PersonService_v2 } from '../../../../modules/person/v2/service/personService'

export const personRouter_v2 = Router()

personRouter_v2.get('/partners', PersonService_v2.getPartners)

