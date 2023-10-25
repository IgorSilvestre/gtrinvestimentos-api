import {
  companySearchEngine,
} from './services/companySearchEngine.externalAPIService';
import { fetchCNPJData } from './services/fetchCNPJData.externalAPIService';

export const externalAPIService = {
    fetchCNPJData,
    companySearchEngine
}
