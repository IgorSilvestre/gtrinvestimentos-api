import { regexForSearch } from './regexForSearch'

export function testRegexForSearch(
  regexWord: string,
  wordToMatch: string,
): Boolean {
  return regexForSearch(regexWord).test(wordToMatch)
}
