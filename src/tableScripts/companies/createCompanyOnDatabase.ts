import { CompanyService } from '../../modules/company/service/companyService'
import { IParsedCompany } from '../interfaces/IParsedCompany'
import { searchTagIds } from './searchTagIds'

export async function createCompanyOnDatabase(company: IParsedCompany) {
  const tags = await searchTagIds(company.tagLabels)
  const companyForDatabase = {
    ...company,
    tags: Array.isArray(tags) ? tags : []
  }
  try {
    if (typeof company.name !== 'string') {
      // console.log('BROKEN COMPANY >>>>')
      return
    }
    return await CompanyService.create(companyForDatabase)
  } catch (err) {
    console.log(err)
    return Error(err)
  }

  // console.log('CRIAR', com
}
