import { Router } from 'express'
import { CompanyController } from '../../modules/company/infra/express/companyController'

export const companyRouter = Router()

companyRouter.post('/', CompanyController.create)

companyRouter.get('/search', CompanyController.search)

companyRouter.get('/get', CompanyController.get)

companyRouter.post('/registerEmployee', CompanyController.registerEmployee)

companyRouter.get('/all-for-select', CompanyController.getAllForSelect)

companyRouter.get('/:id', CompanyController.getById)

companyRouter.put('/:id', CompanyController.update)

companyRouter.delete('/:id', CompanyController.remove)
