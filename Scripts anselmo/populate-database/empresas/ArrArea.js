import {arrIncludeRegex} from "/home/orotel/dev/gtrinvestimentos-api/Scripts anselmo/populate-database/utils/arrIncludeRegex.js"

export const availableTags = [
 "terreno", "log", "comercial", "corporativo", "alto_padrao", "residencial", "lotes", 
 "vertical", "horizontal", "locacao", "ativo_renda", "cri", "s&lb", "cra", "bts", "credito", 
 "debenture", "m&a", "energia", "shopping", "hotel", "hospital", "industria", "distribuidora", 
 "varejo", "servicos", "infraestrutura", "tecnologia", "educacao", "supermercado", "alimentos", 
 "textil", "saude", "farmacia", "agro", "pet", "vestuario"
]

export function filterArea(arrAreaBeforeTest) {
  if (!arrAreaBeforeTest) return
  
  // TODO validar duplicaçao de tags
  const arraySemDuplicatas = [...new Set(arrAreaBeforeTest)];
  const filteredArea = arraySemDuplicatas.filter(word => {
    // console.log(word)
    return arrIncludeRegex(word ,availableTags)
  })
  return filteredArea
}

