export const externalAPIEndpoints = {
    whois: 'https://simple-go-server.sliplane.app/whois/',
    fetchBusinessEmail: {
    method: 'GET',
    url: 'https://email-finder8.p.rapidapi.com/fetch_email_of_person',
    params: {
      first_name: 'John', //example - domains array gets edited in the service
      last_name: 'Doe', //example - domains array gets edited in the service
      domain: 'google.com', //example - domains array gets edited in the service
    },
    headers: {
      'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
      'X-RapidAPI-Host': 'email-finder8.p.rapidapi.com',
    },
  },
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
          'X-RapidAPI-Host': 'linkedin-company-data.p.rapidapi.com',
        },
        data: {
          domains: [
            'hubspot.com', // example - domains array gets edited in the service
          ],
        },
      },
    },
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
        region: 'br',
      },
      headers: {
        'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com',
      },
    },
  },
  findEmail: {
    method: 'GET',
    url: 'https://email-finder8.p.rapidapi.com/fetch_email_of_person',
    params: {
      // filled in service
      first_name: 'john',
      last_name: 'doe',
      domain: 'example.com.br',
    },
    headers: {
      'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
      'X-RapidAPI-Host': 'email-finder8.p.rapidapi.com',
    },
  },
  locations: {
    url: {
      getCitiesByState: 'https://api.brasilaberto.com/v1/cities/',
      getNeighberhoodByCityApiId: 'https://api.brasilaberto.com/v1/districts/',
      getBrazilStates: 'https://api.brasilaberto.com/v1/states',
      getStreetByNeighborhoodApiId: 'https://api.brasilaberto.com/v1/streets/',
    },
    options: {
      headers: {
        Bearer: `${process.env.BRASIL_ABERTO_API_KEY}`,
        'Accept-Encoding': 'gzip, deflate',
      },
    },
  },
}
