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
    name: typeof company.nome === 'string' ? company.nome.trim() : '',
    tagLabels: Array.isArray(tagLabelsArray) ? tagLabelsArray : [],
    target: typeof company.teseInvestimento === 'string' ? company.teseInvestimento.trim() : '',
    description: typeof company.Descrição === 'string' ? company.Descrição.trim() : '',
  }
}
