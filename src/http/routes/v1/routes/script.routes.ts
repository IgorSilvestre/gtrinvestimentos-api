import { Router } from 'express'
import path from 'path'

import { parseSheetToArrayOfObjects } from '../../../../tableScripts/utils/parseSheetToArrayOfObjects'

export const scriptRouter = Router()

scriptRouter.get('/', (_, res) => {
  const filePath = path.resolve(__dirname, '../../../../temp_resources/Produtos GTR_Ago24.xlsx')
  const obj = parseSheetToArrayOfObjects(filePath, 'Ativo_Renda')

  const excelEpoch = new Date(1899, 11, 30)
  obj.forEach((_, i) => {

    // contractTerm
    if (typeof obj[i].contractTerm === 'string' && obj[i].contractTerm.includes('anos')) {
      obj[i].description = obj[i].description + ' - Prazo Novo Contrato: ' + obj[i].contractTerm
      obj[i].contractTerm = new Date(2100, 0, 1)
    } else {
      obj[i].contractTerm = new Date(excelEpoch.getTime() + obj[i].contractTerm * 24 * 60 * 60 * 1000)
    }

    // percentageOfOwnership
    obj[i].percentageOfOwnership = obj[i].percentageOfOwnership * 100

    // isAtypicalContract
    obj[i].isAtypicalContract = (obj[i].isAtypicalContract === 'Atípico') ? true : false

    // description
    obj[i].description = `Variável: ${obj[i]['Variável'] ?? 'X'} - Correção Mon.: ${obj[i]['Correção Mon.'] ?? 'X'} - ${obj[i]['description'] ?? ''}`

    // state
    obj[i].state = obj[i].state ? obj[i].state.replace('-', '').replace(',', '').trim() : delete obj[i].state

    // city
    obj[i].city = obj[i].city ? obj[i].city.replace('-', '').replace(',', '').trim() : delete obj[i].city

    // street
    obj[i].street = obj[i].street ? obj[i].street.replace('-', '').replace(',', '').trim() : delete obj[i].street
  })

  res.status(200).json(obj)
})

