export function regexForSearch(query: string): RegExp {
  query = query
    .replace(/a/gi, '[AÁÀÂÃ]')
    .replace(/e/gi, '[EÉÈÊ]')
    .replace(/i/gi, '[IÍÌÎ]')
    .replace(/o/gi, '[OÓÒÔÕ]')
    .replace(/u/gi, '[UÚÙÛ]')
    .replace(/c/gi, '[CÇ]')
    .replace(/s\((?=\|)/gi, '(s|)');

  return new RegExp(query, 'gmi');
}