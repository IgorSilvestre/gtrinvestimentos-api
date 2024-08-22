export const errorMessageKeys = {
  noFileInRequest: 'Nenhum arquivo na requisição',
  cantUploadFileMiddleware:
    'middleware: Não foi possível fazer upload do arquivo ao servidor',
  badSearchParams: 'Parâmetros de busca inválidos',
  checkIfExistsFailed: 'Não foi possível validar se registro ja existe',
  alreadyExists: 'Registro já existe',
  noQuery: 'Sem query de busca',
  cantSearch: 'Não foi possível realizar busca',
  notFound: 'Não encontrado',
  company: {
    cantRegisterEmployee: 'Não foi possível vincular funcionário',
    cantUnregisterEmployee: 'Não foi possível desvincular funcionário',
    cantGetCompany: 'Não foi possível pegar registro de empresa',
    notCreated: 'Não foi possível criar empresa',
    notFound: 'Empresa não encontrada!',
    notUpdated: 'Não foi possível atualizar empresa',
    notRemoved: 'Não foi possível remover empresa',
  },
  tag: {
    notCreated: 'Não foi possível criar tag',
    notFound: 'Tag não encontrada!',
    notUpdated: 'Não foi possível atualizar tag',
    notRemoved: 'Não foi possível remover tag',
    failedToRebuildCache: 'Falha ao reconstruir cache de tags',
  },
  person: {
    cantGetPerson: 'Não foi possível pegar registro de pessoa',
    notCreated: 'Não foi possível criar pessoa',
    notFound: 'Pessoa não encontrada!',
    notUpdated: 'Não foi possível atualizar pessoa',
    notRemoved: 'Não foi possível remover pessoa',
  },
  externalAPI: {
    cantFetchCNPJData: 'Não foi possível buscar dados do CNPJ',
    cantFetchLinkedinCompanyDataByDomain:
      'Não foi possível buscar dados da empresa no LinkedIn',
  },
  zoning: {
    notCreated: 'Não foi possível criar zoneamento',
    notFound: 'Zoneamento não encontrada!',
    notUpdated: 'Não foi possível atualizar zoneamento',
    notRemoved: 'Não foi possível remover zoneamento',
    failedToRebuildCache: 'Falha ao reconstruir cache de zoneamentos',
  },
  asset: {
    cantGet: 'Não foi possível pegar registro de ativo',
    notCreated: 'Não foi possível criar ativo',
    notFound: 'Ativo não encontrado!',
    notUpdated: 'Não foi possível atualizar ativo',
    notRemoved: 'Não foi possível remover ativo',
  },
  database: {
    aws: {
      s3: {
        cantGet: 'Não foi possível pegar registro do S3',
        cantUpload: 'Não foi possível fazer upload para o S3',
        cantDelete: 'Não foi possível deletar arquivo do S3',
      },
    },
  },
}
