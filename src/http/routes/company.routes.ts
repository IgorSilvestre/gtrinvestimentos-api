import { Router } from 'express'
import { CompanyController } from '../../modules/company/infra/express/companyController'

export const companyRouter = Router()

companyRouter.post('/', CompanyController.create)


companyRouter.get('/all', CompanyController.getAll)

companyRouter.post('/search', CompanyController.search)

companyRouter.get('/all', CompanyController.getAll)

companyRouter.get('/all-for-select', CompanyController.getAllForSelect)

companyRouter.get('/:id', CompanyController.getById)

companyRouter.put('/:id', CompanyController.update)

companyRouter.delete('/:id', CompanyController.remove)
