import { Request, Response } from 'express'
import { parseSheetToArrayOfObjects } from '../utils/parseSheetToObject'
import { serializeCompanyFromSheet } from './serializeCompanyFromSheet'
import { searchTagIds } from './searchTagIds'

export async function main(req: Request, res: Response) {
  console.log('MAIN MAIN')
  let companiesParsed = parseSheetToArrayOfObjects('Empresas')
    .map((company) => serializeCompanyFromSheet(company))
    
    
  let companiesParsedForDatabase = await Promise.all(companiesParsed.map(async (company) => {
    const { tagLabels, ...companyWithoutTagLabels } = company
    const tags = await searchTagIds(tagLabels)
    
    return {
      ...companyWithoutTagLabels,
      tags: Array.isArray(tags) ? tags : ['ERROR'],
    }
  }))

  // console.log(companiesParsedForDatabaseWithTagIds)
  res.send(companiesParsedForDatabase)
}
