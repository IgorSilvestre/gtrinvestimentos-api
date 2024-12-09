import { Router } from 'express'
import { authController } from '../../modules/auth/infra/authController';
import { UserController } from '../../modules/user/infra/express/userController';

export const authRouter = Router()

authRouter.post('/login', authController.login)
authRouter.post("/create-user", UserController.create);

