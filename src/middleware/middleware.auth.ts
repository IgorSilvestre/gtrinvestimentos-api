import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IDecodedToken } from '../shared/interfaces/IDecodedToken';
import { generateTokens } from '../shared/functions/auth/generateTokens';
import { errorMessageKeys } from '../shared/keys/errorMessageKeys';

export function authMiddleware (req: Request, res: Response, next: NextFunction): void {
  const accessToken = req.header("Authorization")?.replace("Bearer ", "");
  if (!accessToken) {
    res.status(401).json({ error: errorMessageKeys.jwt.noTokenProvided });
    return;
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as IDecodedToken;
    req.user = decoded

    next();
  } catch (err) {
    // If the access token is expired, try the refresh token
    const refreshToken = req.header("Refresh-Token");
    if (!refreshToken) {
      res.status(401).json({ error: errorMessageKeys.jwt.tokenExpiredNoRefresh });
      return;
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!, (err: jwt.VerifyErrors | null, decoded: jwt.JwtPayload | string | undefined) => {
      if (err || !decoded || typeof decoded !== 'object') {
        res.status(403).json({ error: errorMessageKeys.jwt.invalidRefreshToken });
        return;
      }

      const { email } = decoded as IDecodedToken;

      // Generate new tokens
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(email);

      // Send new tokens in headers
      res.setHeader("Authorization", `Bearer ${newAccessToken}`);
      res.setHeader("Refresh-Token", newRefreshToken);

      req.user = { email };
      next();
    });
  }
}

