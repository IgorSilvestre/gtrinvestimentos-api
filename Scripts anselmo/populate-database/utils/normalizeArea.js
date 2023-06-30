import { removeParentheses, removeSpecialCharactersAndSpaces } from "./parseString.js";

export function areaToArray (area) {
  if (typeof area !== 'string') return []
  console.log(typeof area)
  let a = area
  let areaNormalized = []

  // this step transforms into array
  a = area
    .replace(/\s/g, '')
    .split(',')
    .filter(element => element !== '');

  a.forEach( b => {
    // TODO fix remove parentheses and special charactes FEITO
    b = removeParentheses(b)
    b = removeSpecialCharactersAndSpaces(b)

    areaNormalized.push(b)
    
  })

  
  



  return areaNormalized
}

console.log(areaToArray('terreno, log, comercial, corporativo, alto_padrao, residencial, lotes, vertical, horizontal, locaçao, ativo_renda, cri, s&lb, cra, bts, credito, debenture, m&a, energia, shopping, hotel, hospital, (industria, distribuidora, varejo, serviços, infraestrutura, tecnologia, educaçao,  supermercado, alimentos, textil, saude, farmacia, agro, pet, vestuario'))