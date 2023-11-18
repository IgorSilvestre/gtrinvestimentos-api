import axios from 'axios'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'
import { externalAPIConfigs } from '../../../../shared/externalAPIEndpoints'
import { CACHE } from '../../../../shared/cache'

interface ICNPJActivity {
  code: string
  text: string
}

interface ICNPJQSA {
  nome: string
  qual: string
}

interface ICNPJBilling {
  free: boolean
  database: boolean
}

interface ICNPJData {
  abertura: string
  situacao: string
  tipo: string
  nome: string
  fantasia: string
  porte: string
  natureza_juridica: string
  atividade_principal: ICNPJActivity[]
  atividades_secundarias: ICNPJActivity[]
  qsa: ICNPJQSA[]
  logradouro: string
  numero: string
  municipio: string
  bairro: string
  uf: string
  cep: string
  telefone: string
  data_situacao: string
  cnpj: string
  ultima_atualizacao: string
  status: string
  complemento: string
  email: string
  efr: string
  motivo_situacao: string
  situacao_especial: string
  data_situacao_especial: string
  capital_social: string
  extra: any // You can specify a more specific type for "extra" if needed
  billing: ICNPJBilling
}

function normalizeCNPJData(CNPJData: ICNPJData) {
  const normalizeCNPJData = {
    Sócios: CNPJData.qsa.map((partner) => ({
      'Nome': partner.nome,
      'Cargo': partner.qual,
    })),
    ...CNPJData,
    ultima_atualizacao: new Date(
      CNPJData.ultima_atualizacao,
    ).toLocaleDateString('pt-BR'),
    capital_social: Number(CNPJData.capital_social).toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
      },
    ),
  }
  delete (normalizeCNPJData as any).qsa
  return normalizeCNPJData
}

export async function fetchCNPJData(cnpj: string) {
  const cachedKey = `fetchCNPJData-${cnpj}`
  const cachedData = await CACHE.get(cachedKey)
  if (cachedData) return cachedData as ICNPJData

  try {
    const response = await axios.get(
      externalAPIConfigs.fetchCNPJData.endpoint + cnpj,
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

