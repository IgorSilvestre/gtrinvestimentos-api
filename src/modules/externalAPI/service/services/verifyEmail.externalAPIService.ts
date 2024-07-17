import axios from 'axios'
import { externalAPIEndpoints } from '../../../../shared/externalAPIEndpoints'

export interface IVerifyEmailResponse {
  email: string
  score: number
}

export async function verifyEmail(
  emails: string[],
): Promise<IVerifyEmailResponse> {
  const bestEmail = {
    email: '',
    score: 0,
  }
  for (const email of emails) {
    try {
      const response = await axios.get(
        `${externalAPIEndpoints.verifyEmail.url}${email}`,
        externalAPIEndpoints.verifyEmail.options,
      )
      
      if (response.data.score > bestEmail.score) {
        bestEmail.score = response.data.score
        bestEmail.email = response.data.email
      }
      if (response.data.score === 100) break
    } catch (error) {
      console.error(`Error verifying email: ${error}`) // Log error but continue
    }
  }

  if (bestEmail.score <= 60) {
    throw new Error('Email not found')
  }

  return bestEmail
}
