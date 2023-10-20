import axios from 'axios'
import { AppError } from '../../../../shared/AppError'
import { errorMessageKeys } from '../../../../shared/keys/errorMessageKeys'

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
        // atividade_principal: CNPJData.atividade_principal.map((activity) => ({
        //     ' ': activity.code,
        //     '': activity.text,
        // })),
        // atividades_secundarias: CNPJData.atividades_secundarias.map(
        //     (activity) => ({
        //         ' ': activity.code,
        //         '': activity.text,
        //     }),
        // ),
    }
    delete (normalizeCNPJData as any).qsa
    return normalizeCNPJData
}

export async function fetchCNPJData(cnpj: string) {
    try {
        const response = await axios.get(
            `https://www.receitaws.com.br/v1/cnpj/${cnpj}`,
        )
        return normalizeCNPJData(response.data)
    } catch (err) {
        return new AppError({
            clientMessage: errorMessageKeys.externalAPI.fetchCNPJData,
            apiError: err,
        })
    }
}
