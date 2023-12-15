import axios from 'axios'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { externalAPIConfigs } from '../../../../shared/externalAPIEndpoints'
import { CACHE } from '../../../../shared/cache'
import { CacheTime } from '../../../../shared/keys/cacheTime'
import { ICNPJData } from '../../interfaces/ICNPJData'
import { removeSpecialCharacters } from '../../../../shared/functions/removeSpecialCharacters'

function normalizeCNPJData(CNPJData: ICNPJData) {
  const normalizeCNPJData = {
    ...CNPJData,
    ultima_atualizacao: new Date(
      CNPJData.ultima_atualizacao,
    ).toLocaleDateString('pt-BR'),
    capital_social: Number(CNPJData.capital_social).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }),
  }
  return normalizeCNPJData
}

export async function fetchCNPJData(cnpj: string) {
  cnpj = removeSpecialCharacters(cnpj)
  const cachedKey = `fetchCNPJData-${cnpj}`
  const cachedData = await CACHE.get(cachedKey)
  if (cachedData) return cachedData as ICNPJData

  try {
    const response = await axios.get(
      externalAPIConfigs.fetchCNPJData.endpoint + cnpj,
      {
        headers: {
          'Accept-Encoding': 'gzip, deflate',
        },
      },
    )
    const CNPJData = normalizeCNPJData(response.data)

    CACHE.set(cachedKey, CNPJData, CacheTime.one_month)
    return CNPJData
  } catch (err: any) {
    return new AppError({
      clientMessage: errorMessageKeys.externalAPI.cantFetchCNPJData,
      apiError: err,
    })
  }
}
