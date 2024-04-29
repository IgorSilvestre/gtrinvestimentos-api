import { Request, Response } from 'express'
import { PersonService } from '../../../service/personService'

export async function sendToDB(req: Request, res: Response) {
  const people = await PersonService.sendToDB()
  return res.json(people)
}
