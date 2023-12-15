import { IAppError } from './interfaces/appError/IAppError'
import { IAppErrorMessage } from './interfaces/appError/IAppErrorMessage'

export class AppError implements IAppError {
  public readonly message
  public readonly status

  constructor(message: IAppErrorMessage, status = 500) {
    console.log('Request ERROR:', { status, message })
    this.message = message
    this.status = status
  }
}

// TODO change all AppError to this one
// export class AppError extends Error {
//   public readonly status: number;

//   constructor(message: string, status = 500) {
//     super(message);
//     this.status = status;
//   }
// }
