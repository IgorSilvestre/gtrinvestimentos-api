import { companySearchEngine } from "./controllers/companySearchEngine.externalAPIController";
import { fetchCNPJData } from "./controllers/fetchCNPJData.externalAPIController";
import { fetchLinkedinCompanyDataByDomain } from "./controllers/fetchLinkedinCompanyDataByDomain.externalAPIController";

export const externalApiController = {
    fetchCNPJData,
    companySearchEngine,
    fetchLinkedinCompanyDataByDomain
}
