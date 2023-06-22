
import { CompanyService } from '/home/orotel/dev/gtrinvestimentos-api/src/modules/company/service/companyService'
import { TagService } from '/home/orotel/dev/gtrinvestimentos-api/src/modules/tag/service/tagService'
import {normalizedCompanies } from '/home/orotel/dev/gtrinvestimentos-api/Scripts anselmo/populate-database/empresas/MAIN.js'

async function createCompany (comp) {
  // console.log('comp', comp)
  const obj = {
    name: comp.nome,
    // "tags":company.area,
  }
  try {
    if(typeof comp.nome !== 'string') {
      console.log('BROKEN COMPANY >>>>')
      return
    }
    return await CompanyService.create(obj)
  } catch (err) {
    console.log(err)
    return Error(err)
  }

  // console.log('CRIAR', com
}

export async function parseSheetCompanies (request,response){
  const tags = await TagService.getAll() // MONTA REGEX PRA BUSCAR O NOME DA TAG AQUI NESSE ARRAY

  // console.log(tags)
  const createdCompanies = await Promise.all(normalizedCompanies().map(async (company) => {
    const createdCompanyOrError = await createCompany(company) 
    if(createdCompanyOrError instanceof Error) return
    return createdCompanyOrError
    // // console.log(await createCompany(company))
    // if (companyCreatedOrError instanceof Error) return 
    // console.log(companyCreatedOrError)
    // return companyCreatedOrError
  }))

  // console.log(createdCompanies)
  response.status(201).json(createdCompanies)
  

//   response.status(501).json(gotError);
  

}