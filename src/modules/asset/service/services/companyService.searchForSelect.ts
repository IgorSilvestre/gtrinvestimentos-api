import { AppError } from '../../../../shared/AppError'
import { ISearchParams } from '../../../../shared/interfaces/ISearchParams'
import { ICompaniesPaginated } from '../../interfaces-validation/ICompaniesPaginated'
import { CompanyService } from '../companyService'
import { parseCompaniesForSelect } from '../../interfaces-validation/parseCompaniesForSelect'

export async function searchForSelect(searchParams: ISearchParams) {
  const companies: ICompaniesPaginated | AppError = await CompanyService.search(
    searchParams,
  )
  if (companies instanceof AppError) return companies

  return parseCompaniesForSelect(companies.data)
}
