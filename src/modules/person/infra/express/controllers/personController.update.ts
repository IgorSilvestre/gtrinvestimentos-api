import { Request, Response } from 'express'
import { PersonService } from '../../../service/personService'
import { AppError } from '../../../../../shared/AppError'
import { ZPerson } from '../../../interfaces-validation/ZPerson'

export async function update (req: Request, res: Response) {
  const { id } = req.params
  try {
    const personUpdateResult: ZPerson | AppError = await PersonService.update(id, req.body)

    if (personUpdateResult instanceof AppError) {
      return res.status(personUpdateResult.status).json({ error: personUpdateResult.message });
    }
    return res.status(200).json(personUpdateResult as ZPerson)
  } catch (err) {
    return res.status(500).json(err)
  }
}
