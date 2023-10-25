import { companySearchEngine } from "./controllers/companySearchEngine.externalAPIController";
import { fetchCNPJData } from "./controllers/fetchCNPJData.externalAPIController";

export const externalApiController = {
    fetchCNPJData,
    companySearchEngine
}
