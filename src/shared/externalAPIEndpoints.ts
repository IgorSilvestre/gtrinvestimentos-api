export const externalAPIConfigs = {
  fetchCNPJData: {
    endpoint: 'https://www.receitaws.com.br/v1/cnpj/',
  },
  linkedin: {
    companyDataByDomain: {
      options: {
          method: 'POST',
          url: 'https://linkedin-company-data.p.rapidapi.com/linkedInCompanyDataByDomainJson',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
            'X-RapidAPI-Host': 'linkedin-company-data.p.rapidapi.com'
          },
          data: {
            domains: [
              'hubspot.com', // example - domains array gets edited in the service
            ]
        }
      }
    }
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
        'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
      }
    }
  }
}

