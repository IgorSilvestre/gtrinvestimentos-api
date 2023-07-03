import { IParsedCompany } from '../interfaces/IParsedCompany'
import { arrIncludeRegex } from '../utils/arrIncludeRegex'
import { tagLabelsToArray } from '../utils/tagLabelsToArray'

export function serializeCompanyFromSheet(
  company: any,
): IParsedCompany {
  const tagLabelsArray = tagLabelsToArray(company?.area || '')

  // put in tagLabels all missing tags from the company (those that are true in the columns)
  for (let companyKeys in company) {
    if (company[companyKeys] === 'V') {
      const columnKeysArr = companyKeys.split(',')
      columnKeysArr.forEach((columKey) => {
        if (!arrIncludeRegex(columKey, tagLabelsArray))
          tagLabelsArray.push(companyKeys)
      })
    }
  }

  return {
    name: company.nome || '',
    tagLabels: tagLabelsArray || [],
    target: company.teseInvestimento || '',
    description: company.Descrição || '',
  }
}
