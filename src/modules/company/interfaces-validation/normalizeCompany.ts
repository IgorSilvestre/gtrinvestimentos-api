import { ZCompanyModel } from '../infra/mongo/companySchema'
import { asyncNormalizeTags } from '../../tag/interfaces-validation/asyncNormalizeTags'
import { parseISODateToBrazilSTD } from '../../../shared/utils/parseISODateToBrazilSTD'


export async function normalizeCompany(company: ZCompanyModel) {
  const { tags } = company
  return {
    ...company.toObject(),
    tags: await asyncNormalizeTags(tags),
    createdAt: parseISODateToBrazilSTD(company?.createdAt?.toISOString()),
    lastUpdated: parseISODateToBrazilSTD(company?.lastUpdated?.toISOString())
  }
}
