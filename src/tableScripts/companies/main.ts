import { Request, Response } from 'express'
import { parseSheetToArrayOfObjects } from '../utils/parseSheetToObject'
import { serializeCompanyFromSheet } from './serializeCompanyFromSheet'
import { searchTagIds } from '../utils/searchTagIds'
import { createCompanyOnDatabase } from './createCompanyOnDatabase'

export async function main(req: Request, res: Response) {
  console.log('MAIN MAIN')
  let companiesParsed = parseSheetToArrayOfObjects('Empresas').map((company) =>
    serializeCompanyFromSheet(company),
  )

  let companiesParsedForDatabase = await Promise.all(
    companiesParsed.map(async (company) => {
      const { tagLabels, ...companyWithoutTagLabels } = company
      const tags = await searchTagIds(tagLabels || [])

      return {
        ...companyWithoutTagLabels,
        tags: Array.isArray(tags) ? tags.map(tag => tag.toString()) : ['ERROR'],
      }
    }),
  )

  const createdCompanies = await Promise.all(
    companiesParsedForDatabase.map(
      async (company) => await createCompanyOnDatabase(company)),
  )

  res.send(createdCompanies)
  // res.send(companiesParsedForDatabase)
}
