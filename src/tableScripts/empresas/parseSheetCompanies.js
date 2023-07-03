import { CompanyService } from '/home/orotel/dev/gtrinvestimentos-api/src/modules/company/service/companyService'
import { TagService } from '/home/orotel/dev/gtrinvestimentos-api/src/modules/tag/service/tagService'
import {normalizedCompanies } from '/home/orotel/dev/gtrinvestimentos-api/Scripts anselmo/populate-database/empresas/MAIN.js'
import { arrIncludeRegex } from '../utils/arrIncludeRegex'
import { testRegex } from '../../../../scripts/scripts/populate-database/utils/regexForStringSearch'
import { removeParentheses } from '../utils/parseString'



async function createCompany (comp) {
  // console.log('comp', comp)
  const obj = {
    ...comp,
    name: comp.nome,
    tags: await searchTagId(comp.area),
  }
  try {
    if(typeof comp.nome !== 'string') {
      // console.log('BROKEN COMPANY >>>>')
      return
    }
    return await CompanyService.create(obj)
  } catch (err) {
    console.log(err)
    return Error(err)
  }

  // console.log('CRIAR', com
}

async function searchTagId (listOfTagNames) {
  if(!Array.isArray(listOfTagNames)) return []

  const tags = await TagService.getAll()
  const arrayOfTagsID = listOfTagNames.map((tagName, i) => {
    tags.map(tag => {
      // if( i < 19 )
      //   const tagNameWithoutParentheses = removeParentheses(tagName)
      
      if(testRegex(tagName,tag.label)){
        return tags.label
      }

    })
    
  })
  return arrayOfTagsID

}


export async function parseSheetCompanies (request,response){

  const createdCompanies = await Promise.all(normalizedCompanies().map(async (company) => {
    const createdCompanyOrError = await createCompany(company) 
    if(createdCompanyOrError instanceof Error) return
    return createdCompanyOrError
  }))


  response.status(201).json(createdCompanies)
}