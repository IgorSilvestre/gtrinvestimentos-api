import { Request, Response } from 'express'
import { CompanyService } from '../../CompanyService'
import { companyValidation } from '../../interfaces-validation/companyValidation'

export const CompanyController = {
    create: async (req: Request, res: Response) => {
        const companyDTO: any = req.body
        
        const validatedCompanyDTO = companyValidation.safeParse(companyDTO)
        if (!validatedCompanyDTO.success) {
            return res.status(400).send(validatedCompanyDTO.error.errors)
        }

        try {
            const result = await CompanyService.store(companyDTO)
            return res.status(200).send(result)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    }

}
