import { ICompanyDocument } from './ICompanyModel'
import { ZCompany } from './ZCompany'

export function parseCompaniesForSelect(companies: ICompanyDocument[]) {
  return companies.map((company) => ({
    value: company._id.toString(),
    label: company.name,
  }))
}
