import { ZCompanyModel } from '../infra/mongo/companySchema'
import { parseISODateToBrazilSTD } from '../../../shared/utils/parseISODateToBrazilSTD'
import { normalizeTags } from '../../tag/interfaces-validation/normalizeTags'
import { ZTag } from '../../tag/interfaces-validation/ZTag'


export function normalizeCompanies(companies: ZCompanyModel | ZCompanyModel[]) {
  companies = Array.isArray(companies) ? companies : [companies]
  let companiesNormalized = companies.map((company) =>  ({
    ...company.toObject(),
    tags: normalizeTags(company.tags as unknown as ZTag[]),
    createdAt: parseISODateToBrazilSTD(company?.createdAt?.toISOString()),
    lastUpdated: parseISODateToBrazilSTD(company?.lastUpdated?.toISOString())
  }))

  if (companiesNormalized.length === 1) return companiesNormalized[0]
  return companiesNormalized
}
