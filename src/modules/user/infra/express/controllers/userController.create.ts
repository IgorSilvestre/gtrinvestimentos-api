import { Request, Response } from 'express'
import { AppError } from '../../../../../shared/AppError'
import { UserService } from '../../../service/userService'
import { userRegisterValidation, ZUser } from '../../interfaces-validation/ZUser'
import { errorMessageKeys } from '../../../../../shared/keys/errorMessageKeys'
import { generateTokens } from '../../../../../shared/functions/auth/generateTokens'
import { defaultValues } from '../../../../../shared/defaultValues'

export async function create(req: Request, res: Response) {
  const userDTO = req.body as ZUser

  const validatedUserDTO = userRegisterValidation.safeParse(userDTO)
  if (!validatedUserDTO.success)
    return res.status(422).json(validatedUserDTO.error.errors)

  // Check if user already exists
  const userExists = await UserService.getByEmail(userDTO.email);
  if (userExists) {
    return res.status(409).json({ error: "User already exists." });
  }

  // Create user
  const user = await UserService.create(validatedUserDTO.data);
  if (!user || user instanceof AppError) {
    return res.status(500).json({ error: errorMessageKeys.user.notCreated });
  }

  const { accessToken, refreshToken } = generateTokens(user.email) // creates tokens to send in response

  // Set tokens as HTTP-only cookies
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: defaultValues.COOKIE_JWT_TOKEN_MAX_AGE,
    path: '/',
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: defaultValues.COOKIE_JWT_REFRESH_TOKEN_MAX_AGE, // 30 days
    path: '/',
  });

  return res.status(201).json({
    message: "Account created successfully.",
    accessToken,
    refreshToken
  });
}

