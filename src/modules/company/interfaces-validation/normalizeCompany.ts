import { TagService } from '../../tag/service/tagService'
import { ZCompanyModel } from '../infra/mongo/companySchema'


export async function normalizeCompany(company: ZCompanyModel) {
  const { tags } = company
  if (!tags) {
    return {
      ...company.toObject(),
      tags: []
    }
  }
  console.log('company', company)
  const tagPromises = tags.map(async (tagId) => {
    const tag: any = await TagService.getById(tagId)
    const response = { value: tag._id, label: tag.name }
    console.log('response', response)
    return response
  })
  const normalizedTags = await Promise.all(tagPromises)
  return {
    ...company.toObject(),
    tags: normalizedTags
  }
}
