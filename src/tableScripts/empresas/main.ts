import { parseSheetToArrayOfObjects } from '../utils/parseSheetToObject'
import { serializeCompanyFromSheet } from './serializeCompanyFromSheet'

export function main () {
  return parseSheetToArrayOfObjects('Empresas').map((company) => serializeCompanyFromSheet(company))
}
