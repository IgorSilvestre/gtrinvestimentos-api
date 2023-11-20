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

export interface ICNPJData {
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
  billing: ICNPJBilling
}
