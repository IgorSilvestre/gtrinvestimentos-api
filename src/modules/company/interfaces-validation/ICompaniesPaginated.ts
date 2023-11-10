import { ICompanyDocument } from "./ICompanyModel"

export interface ICompaniesPaginated {
    data: ICompanyDocument[]
    totalCompanies: number
    totalPages: number
    nextPage?: number | null
    previousPage?: number | null
  }