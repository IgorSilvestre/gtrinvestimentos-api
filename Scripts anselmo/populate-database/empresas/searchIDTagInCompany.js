import { availableTags } from "/home/orotel/dev/gtrinvestimentos-api/Scripts anselmo/populate-database/empresas/ArrArea.js"
import { arrIncludeRegex } from "/home/orotel/dev/gtrinvestimentos-api/Scripts anselmo/populate-database/utils/arrIncludeRegex.js"

import { TagService } from "/home/orotel/dev/gtrinvestimentos-api/src/modules/tag/service/tagService.ts"


export function searchTagId (listOfTagNames){
  const arrayOfTagsID = []
  listOfTagNames.foreach(tagName =>{
    if(!arrIncludeRegex(tagName,availableTags)) return  
    arrayOfTagsID.push(TagService.getById(tagName))
    
  })
  return arrayOfTagsID
}

 console.log(searchTagId('comercial'))