function regexForStringSearch(query) {
  query = query
    .replace(/a/gi, '[AÁÀÂÃ]')
    .replace(/e/gi, '[EÉÈÊ]')
    .replace(/i/gi, '[IÍÌÎ]')
    .replace(/o/gi, '[OÓÒÔÕ]')
    .replace(/u/gi, '[UÚÙÛ]')
    .replace(/c/gi, '[CÇ]')
    .replace(/(s|)/gi, '(s|)')

    
  return new RegExp(query, 'gmi');
}


// tenho que colocar para ser palavra e arr
export const testRegex = (regexWord, wordToMatch) => regexForStringSearch(regexWord).test(wordToMatch)



