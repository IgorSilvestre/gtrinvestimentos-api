import { Router } from 'express'
import { CompanyController } from '../../modules/company/infra/express/companyController'
import { main } from '../../tableScripts/companies/main'

export const companyRouter = Router()

companyRouter.post('/', CompanyController.create)


companyRouter.post('/send-table', main) // Table Scripts

companyRouter.get('/all', CompanyController.getAll)

companyRouter.get('/search', CompanyController.search)

companyRouter.get('/all', CompanyController.getAll)

companyRouter.get('/:id', CompanyController.getById)

companyRouter.put('/:id', CompanyController.update)

companyRouter.delete('/:id', CompanyController.remove)
