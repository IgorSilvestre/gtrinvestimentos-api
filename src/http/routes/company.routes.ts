import { Router } from 'express'
import { CompanyController } from '../../modules/company/infra/express/companyController'

export const companyRouter = Router()

companyRouter.post('/', CompanyController.create)

companyRouter.get('/:id', CompanyController.getById)

companyRouter.put('/:id', CompanyController.update)

companyRouter.delete('/:id', CompanyController.delete)
