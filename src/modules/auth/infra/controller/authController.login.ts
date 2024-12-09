import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { userValidation } from "../../../user/infra/interfaces-validation/ZUser";
import { UserService } from "../../../user/service/userService";
import { AppError } from "../../../../shared/AppError";
import { generateTokens } from "../../../../shared/functions/auth/generateTokens";
import { defaultValues } from "../../../../shared/defaultValues";

export async function login (req: Request, res: Response) {
  const userDTO = req.body;

  const validatedUserDTO = userValidation.safeParse(userDTO)
  if (!validatedUserDTO.success)
    return res.status(422).json(validatedUserDTO.error.errors)

  const user = await UserService.getByEmail(userDTO.email)
  if (!user)
    return res.status(401).json({ error: 'Invalid email or password.' });
  if (user instanceof AppError)
    return res.status(401).json({ error: user.message || 'Invalid email or password.' })

  // Check password
  const isPasswordValid = await bcrypt.compare(userDTO.password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user.email);

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

  return res.status(200).json({ message: 'Login successful' });
}

