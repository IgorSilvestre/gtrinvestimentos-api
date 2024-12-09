import jwt from 'jsonwebtoken';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

function generateTokens(email: string): Tokens {
  const accessToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "30d" });
  return { accessToken, refreshToken };
}

export { generateTokens }

