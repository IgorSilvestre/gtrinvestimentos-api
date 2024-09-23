import { Request, Response, NextFunction } from 'express'
import { LogRepository } from '../modules/log/infra/mongo/repository/logRepository'

export async function logMiddleware(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const { method, url, body } = req
  const logEntry = {
    action: `${method} ${url}`,
    body,
    timestamp: new Date(),
  }

  try {
    await LogRepository.create(logEntry)
  } catch (error) {
    console.error('Error logging action:', error)
  }
  next()
}

