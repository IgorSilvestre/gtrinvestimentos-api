import { Router } from 'express'
import { CompanyController } from '../../modules/company/infra/express/companyController'
import { parseSheetCompanies } from '/home/orotel/dev/gtrinvestimentos-api/Scripts anselmo/populate-database/empresas/parseSheetCompanies.js'

export const companyRouter = Router()

companyRouter.post('/', CompanyController.create)// Crio

companyRouter.post('/send-table', parseSheetCompanies)// minha

companyRouter.get('/all', CompanyController.getAll)// pego todas

companyRouter.get('/:id', CompanyController.getById)// pego pelo ID

companyRouter.put('/:id', CompanyController.update)// atualizo

companyRouter.delete('/:id', CompanyController.remove) // remove
