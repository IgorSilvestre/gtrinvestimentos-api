import { Request, Response } from 'express'
import { PersonService } from '../../../service/personService'
import { DeleteResult } from 'mongodb'
import { AppError } from '../../../../../../shared/AppError'

export async function remove(req: Request, res: Response) {
  const { id } = req.params
  const result: DeleteResult | AppError = await PersonService.remove(id)

  if (result instanceof AppError)
    return res.status(result.status).json({ error: result.message })
  return res.status(204).json(result)
}
