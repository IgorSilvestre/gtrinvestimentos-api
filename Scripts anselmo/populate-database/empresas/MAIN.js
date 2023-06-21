import {areaToArray } from '/home/orotel/dev/scripts/scripts/populate-database/utils/normalizeArea.js'
import { sheetToObject } from '/home/orotel/dev/scripts/scripts/populate-database/utils/sheetToObject.js';
import { normalizedObj } from '/home/orotel/dev/scripts/scripts/populate-database/empresas/CreateObj.js';
import {arrIncludeRegex} from "/home/orotel/dev/scripts/scripts/populate-database/utils/arrIncludeRegex.js"

// --------------------------------------------
export function normalizedCompanies () {
  let normalizedCompanies = []

  sheetToObject('Empresas').forEach(function(company){
    const areaArr = areaToArray(company.area)
    for(let companyKeys in company){
  
      if(company[companyKeys] === "V"){
        const columnKeysArr = companyKeys.split(',')
        columnKeysArr.forEach(columKey =>{
          if(!arrIncludeRegex(columKey,areaArr)){
            areaArr.push(companyKeys)
          }
                  
        })
      }
    }
    normalizedCompanies.push(normalizedObj(company.nome,company.area, company.teseInvestimento, company.Descrição))
  })
  return(normalizedCompanies)
}

// console.log(normalizedCompanies())
