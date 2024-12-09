export const TIME = {
  ONE_MINUTE: 60,
  ONE_HOUR: 60 * 60,
  ONE_DAY: 60 * 60 * 24,
  ONE_WEEK: 60 * 60 * 24 * 7,
  ONE_MONTH: 60 * 60 * 24 * 30,
  ONE_YEAR: 60 * 60 * 24 * 365,
}

export const defaultValues = {
  paginationLimit: 20,
  paginationPage: 1,
  COOKIE_JWT_TOKEN_MAX_AGE: TIME.ONE_MINUTE * 15,
  COOKIE_JWT_REFRESH_TOKEN_MAX_AGE: TIME.ONE_MONTH,
}
