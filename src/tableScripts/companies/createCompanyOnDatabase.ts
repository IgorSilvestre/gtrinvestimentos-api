import { CompanyService } from '../../modules/company/service/companyService'
import { IParsedCompany } from '../interfaces/IParsedCompany'

export async function createCompanyOnDatabase(company: IParsedCompany) {
  try {
    if (typeof company.name !== 'string') {
      // console.log('BROKEN COMPANY >>>>')
      return
    }
    return await CompanyService.create(company)
  } catch (err) {
    console.log(err)
    return Error(`${err}`)
  }

  // console.log('CRIAR', com
}
