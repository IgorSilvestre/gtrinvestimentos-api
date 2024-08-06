import { normalizeTags } from '../../../shared/functions/normalizeTags'
import { parseISODateToBrazilSTD } from '../../../shared/functions/parseISODateToBrazilSTD'
import { ZTag } from '../../tag/interfaces-validation/ZTag'
import { ICompanyDocument } from './ICompanyModel'

export function normalizeCompanies(
  companies: ICompanyDocument | ICompanyDocument[],
) {
  companies = Array.isArray(companies) ? companies : [companies]
  let companiesNormalized = companies.map((company) => ({
    ...company,
    tags: normalizeTags(company.tags as unknown as ZTag[]),
    createdAt: parseISODateToBrazilSTD(company?.createdAt?.toISOString()),
    lastUpdated: parseISODateToBrazilSTD(company?.lastUpdated?.toISOString()),
  }))

  return companiesNormalized
}
