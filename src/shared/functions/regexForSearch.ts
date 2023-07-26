export function regexForSearch(query: string, isFullMatch = false): RegExp {
  query = query
    .replace(/a/gi, '[AÁÀÂÃ]')
    .replace(/e/gi, '[EÉÈÊ]')
    .replace(/i/gi, '[IÍÌÎ]')
    .replace(/o/gi, '[OÓÒÔÕ]')
    .replace(/u/gi, '[UÚÙÛ]')
    .replace(/c/gi, '[CÇ]')
    .replace(/s\((?=\|)/gi, '(s|)')

  return isFullMatch
    ? new RegExp(`^${query}$`, 'gmi')
    : new RegExp(query, 'gmi')
}
