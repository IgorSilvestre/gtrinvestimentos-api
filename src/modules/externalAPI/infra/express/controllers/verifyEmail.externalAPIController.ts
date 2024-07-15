import { Request, Response } from 'express';
import { externalAPIService } from '../../../service/externalAPIService';

export async function verifyEmail(req: Request, res: Response) {
    const { email } = req.params
    try {
        const response = await externalAPIService.verifyEmail(email)
        res.status(200).json(response)
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}

