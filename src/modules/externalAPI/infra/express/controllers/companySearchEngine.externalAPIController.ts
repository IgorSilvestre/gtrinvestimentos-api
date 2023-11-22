import { Request, Response } from 'express'
import { AppError } from '../../../../../shared/AppError'
import { errorMessageKeys } from '../../../../../shared/keys/errorMessageKeys'
import { externalAPIService } from '../../../service/externalAPIService'

export async function companySearchEngine (req: Request, res: Response) {
    const { query } = req.query
    if (!query || typeof query !== 'string') return res.status(400).json({ error: errorMessageKeys.noQuery })
    
    try {
        const externalAPIResponse = await externalAPIService.companySearchEngine(query as string)

        if (externalAPIResponse instanceof AppError) {
            return res.status(externalAPIResponse.status).json({ error: externalAPIResponse.message })
        }

        return res.status(200).json(externalAPIResponse)
    } catch (error) {
        console.error('Error fetching data:', error)
        return res.status(500).json({ clientMessage: errorMessageKeys.cantSearch, error: error })
    }
}
