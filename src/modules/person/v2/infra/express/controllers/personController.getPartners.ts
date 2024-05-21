import { Request, Response } from 'express'
import { AppError } from '../../../../../../shared/AppError'
import { serializePerson } from '../../../../interfaces-validation/personSerializer'
import { PersonService_v2 } from '../../../service/personService'
import { ZPersonModel } from '../../../../v1/infra/mongo/personSchema'

export async function getPartners(_: Request, res: Response) {
  const person = await PersonService_v2.getPartners()
  if (person instanceof AppError) {
    return res.status(person.status).json({ error: person.message })
  }

  return res.status(200).json(serializePerson(person as ZPersonModel[]))
}

