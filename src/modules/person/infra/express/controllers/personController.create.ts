import { Request, Response } from 'express'
import { personValidation, ZPerson } from '../../../interfaces-validation/ZPerson'
import { PersonService } from '../../../service/personService'
import { AppError } from '../../../../../shared/AppError'

export async function create (req: Request, res: Response) {
  const personDTO = req.body as ZPerson

  const validatedPersonDTO = personValidation.safeParse(personDTO)
  if (!validatedPersonDTO.success) {
    return res.status(400).json(validatedPersonDTO.error.errors)
  }

  const person: ZPerson | AppError = await PersonService.create(personDTO)

  if (person instanceof AppError) {
    return res.status(person.status).json({ error: person.message })
  }
  return res.status(200).json(person as ZPerson)
}
