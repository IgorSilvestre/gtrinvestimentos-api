import { Request, Response } from 'express'
import { removeSpecialCharacters } from '../../../../../shared/functions/removeSpecialCharacters'
import { externalAPIService } from '../../../service/externalAPIService'
import { AppError } from '../../../../../shared/AppError'

export async function fetchCNPJData(req: Request, res: Response) {
    const { cnpj } = req.params

    if (!cnpj) return res.status(400).json({ error: 'CNPJ is required' })

    const cnpjNormalized = removeSpecialCharacters(cnpj)
    try {
        const CNPJData = await externalAPIService.fetchCNPJData(cnpjNormalized)

        if (CNPJData instanceof AppError) {
            return res.status(CNPJData.status).json({ error: CNPJData.message })
        }

        return res.status(200).json(CNPJData)
    } catch (error) {
        console.error('Error fetching data:', error)
        return res.status(500).json({ error: 'Error fetching data' })
    }
}
