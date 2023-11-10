import { ICompanyDocument } from "./ICompanyModel"

export interface ICompaniesPaginated {
    data: ICompanyDocument[]
    totalCompanies: number | null
    totalPages: number | null
    nextPage?: number | null
    previousPage?: number | null
  }