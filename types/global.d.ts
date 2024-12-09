import { IDecodedToken } from "../src/shared/interfaces/IDecoded";

declare global {
  namespace Express {
    interface Request {
      user?: IDecodedToken;
    }
  }
}
