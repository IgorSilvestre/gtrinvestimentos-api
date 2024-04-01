export const errorMessageKeys = {
  checkIfExistsFailed: 'Não foi possível validar se registro ja existe',
  alreadyExists: 'Registro já existe',
  noQuery: 'Sem query de busca',
  cantSearch: 'Não foi possível realizar busca',
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
  }
}
