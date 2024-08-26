export interface ISearchParams {
  partialStringSearch?: boolean
  tags?: string[]
  query?: string
  search?: { query?: string, tags?: string[] }
  isFullMatch?: boolean
  type?: 'partialWord' | 'matchWord'
  count?: boolean
  page?: number
  limit?: number
}

