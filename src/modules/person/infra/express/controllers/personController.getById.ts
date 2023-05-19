import { Request, Response } from 'express'
import { PersonService } from '../../../service/personService'
import { AppError } from '../../../../../shared/AppError'
import { ZPerson } from '../../../interfaces-validation/ZPerson'
import { serializePerson } from '../../../interfaces-validation/personSerializer'
import { ZPersonModel } from '../../mongo/personSchema'

export async function getById (req: Request, res: Response) {
  const { id } = req.params
  const person: ZPerson | AppError = await PersonService.getById(id)
  if (person instanceof AppError) {
    return res.status(person.status).json({ error: person.message })
  }

  return res.status(200).json(serializePerson(person as ZPersonModel[]))
}
