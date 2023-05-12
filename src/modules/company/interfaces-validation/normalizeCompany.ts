import { ZCompanyModel } from '../infra/mongo/companySchema'
import { asyncNormalizeTags } from '../../tag/interfaces-validation/asyncNormalizeTags'


export async function normalizeCompany(company: ZCompanyModel) {
  const { tags } = company
  return {
    ...company.toObject(),
    tags: await asyncNormalizeTags(tags)
  }
}
