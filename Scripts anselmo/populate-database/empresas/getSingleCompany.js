import {regexForStringSearch} from '../utils/regexForStringSearch'

export function getSingleCompany (sheetJson, companyName) {
  return sheetJson.filter(company => regexForStringSearch(companyName, company.nome))
}
