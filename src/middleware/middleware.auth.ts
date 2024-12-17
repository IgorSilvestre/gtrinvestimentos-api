import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IDecodedToken } from '../shared/interfaces/IDecodedToken';
import { generateTokens } from '../shared/functions/auth/generateTokens';
import { errorMessageKeys } from '../shared/keys/errorMessageKeys';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Extract tokens from cookies
  const accessToken = req.cookies?.access_token
  const refreshToken = req.cookies?.refresh_token

  if (!accessToken) {
    res.status(401).json({ error: errorMessageKeys.jwt.noTokenProvided });
    return;
  }

  try {
    // Verify access token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as IDecodedToken;
    req.user = decoded;

    next(); // Token is valid; proceed to next middleware
  } catch (err) {
    // Access token expired or invalid, check refresh token
    if (!refreshToken) {
      res.status(401).json({ error: errorMessageKeys.jwt.tokenExpiredNoRefresh });
      return;
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err || !decoded || typeof decoded !== "object") {
        res.status(403).json({ error: errorMessageKeys.jwt.invalidRefreshToken });
        return;
      }

      const { email } = decoded as IDecodedToken;

      // Generate new tokens
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(email);

      // Set new tokens in cookies
      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict",
      });
      res.cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      req.user = { email };
      next();
    });
  }
}

