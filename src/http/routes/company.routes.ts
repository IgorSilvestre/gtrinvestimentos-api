import { Router } from 'express'
import { CompanyController } from '../../modules/company/infra/express/companyController'
import { main } from '../../tableScripts/companies/main'

export const companyRouter = Router()

companyRouter.post('/', CompanyController.create)// Crio

companyRouter.post('/send-table', main)// minha

companyRouter.get('/all', CompanyController.getAll)// pego todas

companyRouter.get('/:id', CompanyController.getById)// pego pelo ID

companyRouter.put('/:id', CompanyController.update)// atualizo

companyRouter.delete('/:id', CompanyController.remove) // remove
