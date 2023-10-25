export const externalAPIConfigs = {
  fetchCNPJData: {
    endpoint: 'https://www.receitaws.com.br/v1/cnpj/',
  },
  companySearchEngine: {
    defaultOptions: {
      method: 'GET',
      url: 'https://local-business-data.p.rapidapi.com/search',
      params: {
        query: '', // Query gets edited in the service
        // limit: '20',
        // zoom: '13',
        language: 'pt',
        region: 'br'
      },
      headers: {
        'X-RapidAPI-Key': '223d54b17bmsh3228eb7095d78ddp1f0c60jsn3eff6a281b01',
        'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
      }
    }
  }
}

