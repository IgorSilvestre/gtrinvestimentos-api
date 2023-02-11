import { IAppError } from './interfaces/IAppError'

export class AppError implements IAppError {
  public readonly message: string
  public readonly status: number

  constructor(message: any, status = 500) {
    console.log({ status, message })
    this.message = message
    this.status = status
  }
  // public static formatMessage(message:any){
  //   return message?.map((i: { message: any; path: any; }) => {
  //     return {"message":i.message, "path": i.path }
  //  });
  // }
}
