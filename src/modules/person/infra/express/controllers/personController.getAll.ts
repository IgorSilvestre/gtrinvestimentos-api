import { Request, Response } from 'express'
import { PersonService } from '../../../service/personService'
import { AppError } from '../../../../../shared/AppError'
import { serializePerson } from '../../../interfaces-validation/personSerializer'
import { ZPersonModel } from '../../mongo/personSchema'

export async function getAll (req: Request, res: Response) {
  const person = await PersonService.getAll()
  if (person instanceof AppError) {
    return res.status(person.status).json({ error: person.message })
  }

  return res.status(200).json(serializePerson(person as ZPersonModel[]))
}
