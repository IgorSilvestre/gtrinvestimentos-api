import { Request, Response } from 'express'
import { ZPersonModel } from '../../mongo/personSchema'
import { PersonService } from '../../../service/personService'
import { AppError } from '../../../../../../shared/AppError'

export async function search(req: Request, res: Response) {
  const people: ZPersonModel[] | AppError = await PersonService.search(req.body)
  if (people instanceof AppError) {
    return res.status(people.status).json({ error: people.message })
  }
  return res.status(200).json(people)
}
